const Cart = require("../models/model.cart");

exports.show_all_cart = async (req, res, next) => {
    try {
        const cart = await Cart.find().populate("book", "name price  images");
        res.json(cart);
    } catch (err) {
        next(err);
    }
};

exports.create_cart = async (req, res, next) => {
    try {
        const { book } = req.body;
        const quantity = 1;
        const cart = await Cart.create({ book, quantity });
        res.json(cart);
        console.log("data inserted sucessfully");
    } catch (err) {
        next(err);
    }
};

exports.delete_cart = async (req, res, next) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.json({ message: "cart deleted successfully" });
    } catch (err) {
        next(err);
    }
};
