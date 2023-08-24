// name , email , password , role
const User = require('../models/model.user');

exports.create_user = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            throw new Error('All fields are required');
        }

        await User.create({ name, email, password, role });
        res.status(200).json({ message: 'User created successfully' });
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
