const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    Slug: {
        type: String,
        unique: true,
    },
    isbn: {
        type: String,
    },
    price: {
        type: String,
    },

    description: {
        type: String,
    },
    images: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
