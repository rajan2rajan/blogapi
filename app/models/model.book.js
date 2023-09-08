const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    isbn: {
        type: String,
    },
    price: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
