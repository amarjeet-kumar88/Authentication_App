const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');

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
        type: Date,
    }
}, {
    timestamps: true
});

userSchema.methods.jwtToken = function () {
    return jwt.sign(
        { id: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;