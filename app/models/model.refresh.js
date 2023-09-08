const mongoose = require('mongoose');

const refreshSchema = new mongoose.Schema({
    refresh_token: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Refresh = mongoose.model('Refresh', refreshSchema);

module.exports = Refresh;
