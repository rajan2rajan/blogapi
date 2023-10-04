const Book = require("../models/model.book");
const uuid = require("uuid").v4;
const Category = require("../models/model.category");
const fs = require("fs/promises");

exports.show_all_books = async (req, res, next) => {
    try {
        const books = await Book.find().populate("category", "name");
        res.json(books);
    } catch (err) {
        next(err);
    }
};

exports.show_book_by_id = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id).populate("category", "name");
        res.json(book);
    } catch (err) {
        next(err);
    }
};

exports.create_book = async (req, res, next) => {
    try {
        const file = req.files.images;
        const filepath = `/images/${uuid()}.${file.name.split(".").pop()}`;
        await req.files.images.mv(`app/public${filepath}`);
        const { name, isbn, price, description, category } = req.body;
        await Book.create({
            name,
            isbn,
            price,
            description,
            images: filepath,
            category,
            Slug: name.replace(/ /g, "-"),
        });

        res.status(200).json({ message: "Book created successfully" });
        console.log("create book");
    } catch (err) {
        next(err);
    }
};

exports.delete_book = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Book.findById(id);
        const image = data.images;
        const filepath = `app/public${image}`;
        if (filepath !== null) {
            await fs.unlink(filepath);
        }
        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        next(error);
    }
};

exports.update_book = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Book.findById(id).populate("category", "name");
        const image = data.images;
        const filepath = `app/public${image}`;

        if (filepath == null) {
            await Book.findByIdAndUpdate(id, req.body).populate("category", "name");
            return res.status(200).json({ message: "Book updated successfully" });
        }
        if (filepath !== null) {
            await fs.unlink(filepath);
        }

        const file = req.files.images;
        const updated_images = `/images/${uuid()}.${file.name.split(".").pop()}`;
        await req.files.images.mv(`app/public${updated_images}`);

        const { name, isbn, price, description, category } = req.body;
        const existingBook = await Book.findById(id).populate("category", "name");

        existingBook.set({
            name,
            isbn,
            price,
            description,
            images: updated_images,
            category,
            Slug: name.replace(/ /g, "-"),
        });

        await existingBook.save();

        res.status(200).json({ message: "Book updated successfully" });
    } catch (err) {
        next(err);
    }
};
