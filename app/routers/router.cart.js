const router = require("express").Router();
const Cart = require("../controllers/controller.cart");

// list all the cart
router.route("/").get(Cart.show_all_cart).post(Cart.create_cart);
router.route("/remove").post(Cart.delete_cart);

module.exports = router;
