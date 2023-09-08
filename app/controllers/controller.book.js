const Book = require('../models/model.book');
const Category = require('../models/model.category');

exports.show_all_books = async (req, res, next) => {
    try {
        console.log('show all books');
        const books = await Book.find().populate('category');
        res.json(books);
    } catch (err) {
        next(err);
    }
};

exports.create_book = async (req, res, next) => {
    try {
        const { name, isbn, price, category } = req.body;
        await Book.create({ name, price, isbn, category });
        res.status(200).json({ message: 'Book created successfully' });
    } catch (err) {
        next(err);
    }
};

exports.delete_book = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        next(error);
    }
};

exports.update_book = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const { name, price, category } = req.body;
        await Book.findByIdAndUpdate({ _id: id }, { name, price, category });
        res.status(200).json({ message: 'Book updated successfully' });
    } catch (err) {
        next(err);
    }
};
