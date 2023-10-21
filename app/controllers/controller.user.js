// this page is just to create Admin page to create Customer page we use auth controller
const User = require("../models/model.user");

exports.create_user = async (req, res, next) => {
    try {
        console.log("create user");
        const { name, email, password, phone_number, role } = { ...req.body, role: "Admin" };
        if (!name || !email || !password || !phone_number) {
            throw new Error("All fields are required");
        }

        await User.create({ name, email, password, phone_number, role });
        res.status(200).json({ message: "User created successfully" });
    } catch (err) {
        next(err);
    }
};

exports.show_all_users = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
};
