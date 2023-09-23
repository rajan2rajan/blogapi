const Book = require("../models/model.book");
const uploadFile = require("../config/fileupload");
const Category = require("../models/model.category");

exports.show_all_books = async (req, res, next) => {
    try {
        console.log("show all books");
        const books = await Book.find().populate("category");
        res.json(books);
    } catch (err) {
        next(err);
    }
};

exports.create_book = async (req, res, next) => {
    try {
        console.log("create book");
        // const file = req.files?.image;
        // console.log(file);
        // const image_name = await uploadFile(file, "images");
        // const book = new Book({
        //     ...req.body,
        //     image_name,
        //     Slug: req.body.name.replace(/\s+/g, "-").toLowerCase(),
        // });
        // console.log(book);
        // await book.save();
        res.status(200).json({ message: "Book created successfully" });
    } catch (err) {
        next(err);
    }
};

exports.delete_book = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        next(error);
    }
};

exports.update_book = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const { name, price, category } = req.body;
        await Book.findByIdAndUpdate({ _id: id }, { name, price, category });
        res.status(200).json({ message: "Book updated successfully" });
    } catch (err) {
        next(err);
    }
};
