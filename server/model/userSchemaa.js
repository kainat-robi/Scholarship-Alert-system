const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id already registered"],   
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    application: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'applications'
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
