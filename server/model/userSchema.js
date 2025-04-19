const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'user name require'],
        maxLength: [50, 'Name must be less than 50'],
        trim: true
    },
    email: {
        type: String,
        require: [true, 'user email require'],
        unique: [true, 'already register'],
        lowercase: true,
    },
    password: {
        type: String,
        select: false
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordToken: {
        type: date,
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;