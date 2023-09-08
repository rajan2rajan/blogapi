const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        unique: true,
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

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
