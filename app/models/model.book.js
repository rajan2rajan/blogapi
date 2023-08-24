const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Book name is required'],
        trim: true,
        maxLength: [32, 'Book name must be less than 32 characters'],
        minLength: [2, 'Book name must be more than 2 characters'],
    },
    isbn: {
        type: String,
        required: [true, 'Book isbn is required'],
        trim: true,
        maxLength: [32, 'Book isbn must be less than 32 characters'],
        minLength: [2, 'Book isbn must be more than 2 characters'],
    },
    price: {
        type: String,
        required: [true, 'Book price is required'],
        trim: true,
        maxLength: [32, 'Book price must be less than 32 characters'],
        minLength: [2, 'Book price must be more than 2 characters'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required'],
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
