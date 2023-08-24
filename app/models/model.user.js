const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        maxLength: [32, 'User name must be less than 32 characters'],
        minLength: [2, 'User name must be more than 2 characters'],
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        maxLength: [32, 'User email must be less than 32 characters'],
        minLength: [2, 'User email must be more than 2 characters'],
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        trim: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Customer'],
        default: 'Customer',
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
