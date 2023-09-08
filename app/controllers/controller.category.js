const Category = require('../models/model.category.js');
const joi = require('joi');

// list all the categories
exports.show_all_category = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        next(err);
    }
};

exports.create_category = async (req, res, next) => {
    try {
        const { name, status } = req.body;
        const category = await Category.create({ name, status });
        res.json(category);
    } catch (err) {
        next(err);
    }
};

exports.delete_category = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        next(err);
    }
};
