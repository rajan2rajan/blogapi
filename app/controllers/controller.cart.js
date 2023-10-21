const Cart = require("../models/model.cart");

exports.show_all_cart = async (req, res, next) => {
    const user = req.user.sub;
    try {
        // get cart for user
        let cart = await Cart.findOne({ user }).select("-user").populate("items.book");

        if (!cart) cart = await Cart.create({ user, items: [] });
        res.json(cart);
    } catch (err) {
        next(err);
    }
};

exports.create_cart = async (req, res, next) => {
    const { book: bookId } = req.body;
    const user = req.user.sub;

    try {
        let cart = await Cart.findOne({ user }).select("-user");

        if (!cart) {
            // create a new cart
            const newCart = await Cart.create({ user, items: [{ book: bookId, quantity: 1 }] });
            return res.status(201).json({
                status: "success",
                data: newCart,
            });
        }

        // check if book is already in the cart
        const book = cart.items.find((item) => item.book == bookId);

        if (book) {
            // increase quantity of book in cart
            book.quantity += 1;
        } else {
            cart.items.push({ book: bookId, quantity: 1 });
        }

        await cart.save();

        // populate cart with book details
        cart = await Cart.findOne({ user }).select("-user").populate("items.book");

        res.status(200).json({
            status: "success",
            data: cart,
        });
    } catch (err) {
        next(err);
    }
};

exports.delete_cart = async (req, res, next) => {
    const { book: bookId } = req.body;
    const user = req.user.sub;

    try {
        // check if cart exists for user
        let cart = await Cart.findOne({ user }).select("-user");
        console.log(cart);
        if (!cart)
            return res.status(404).json({
                status: "fail",
                message: "Cart not found",
            });

        // check if book is already in the cart
        const book = cart.items.find((item) => item.book == bookId);

        // if book not in cart return error
        if (!book)
            return res.status(404).json({
                status: "fail",
                message: "Book not found in cart",
            });

        // if book already in cart remove 1 to quantity
        book.quantity -= 1;

        if (book.quantity == 0) {
            const index = cart.items.indexOf(book);
            cart.items.splice(index, 1);
        }

        await cart.save();

        // populate cart with book details
        cart = await Cart.findOne({ user }).select("-user").populate("items.book");

        res.status(200).json({
            status: "success",
            data: cart,
        });
    } catch (err) {
        next(err);
    }
};
