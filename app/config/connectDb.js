const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('connect to database');
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
