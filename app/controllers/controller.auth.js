const User = require("../models/model.user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Refresh = require("../models/model.refresh");
require("dotenv").config();

exports.create_user = async (req, res, next) => {
    try {
        const { name, email, password, confirm_password, phone_number, role } = {
            ...req.body,
            role: "Customer",
        };
        if (!name || !email || !password || !confirm_password || !phone_number) {
            throw new Error("All fields are required");
        }
        if (password !== confirm_password) {
            throw new Error("Password not match");
        }

        await User.create({ name, email, password, phone_number, role });
        res.status(200).json({ message: "User created successfully" });
    } catch (err) {
        next(err);
    }
};

exports.login_user = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User does not exist");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Incorrect password");
        }
        const access_token = jwt.sign(generatePayload(user), process.env.ACCESS_TOKEN, {
            expiresIn: "20m",
        });
        const refresh_token = jwt.sign(generatePayload(user), process.env.REFRESH_TOKEN, {
            expiresIn: "7d",
        });
        await Refresh.create({ refresh_token, user: user._id });

        res.status(200).json({
            success: true,
            data: {
                user,
                access_token,
                refresh_token,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.refresh_token_recive = async (req, res, next) => {
    const refresh_token = req.body.refresh_token;

    try {
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN, async (err, decoded) => {
            if (err) {
                err = new Error("Invalid refresh token");
                return next(err);
            } else {
                const isValid = await Refresh.findOne({ refresh_token }).populate("user");
                if (!isValid) {
                    throw new Error("Invalid refresh token");
                }
                const access_token = jwt.sign(generatePayload(decoded), process.env.ACCESS_TOKEN, {
                    expiresIn: "1m",
                });
                res.status(200).json({ success: true, data: { access_token } });
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.logout_user = async (req, res, next) => {
    try {
        await Refresh.findOneAndDelete({ refresh_token: req.body.refresh_token });
        res.status(200).json({ success: true, message: "Logout successfully" });
    } catch (err) {
        next(err);
    }
};

function generatePayload(data) {
    return {
        sub: data._id,
        role: data.role,
        email: data.email,
    };
}
