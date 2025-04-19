const userModel = require("../model/userSchema");
const emailValidator = require('email-validator');


const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success: false,
            message: 'Every field are required'
        })
    }

    const validEmail = emailValidator.validate(email);
    if(!validEmail){
        return res.status(400).json({
            success: false,
            message: 'Provide valid email id'
        })
    }

    if(password != confirmPassword){
        return res.status(400).json({
            success: false,
            message: 'password and confirm password does not match'
        })
    }

    try {
        const userInfo = userModel(req.body);
        const result = await userInfo.save();

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (e) {
        if(e.code == 11000){
            return res.status(400).json({
                success: false,
                message: 'Account already exist with provided email id'
            })
        }
        return res.status(400).json({
            success: false,
            data: e.message
        })
    }
    
}

const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Every field is required'
        });
    }

    try {
        const user = await userModel.findOne({ email }).select('+password');

        if (!user || user.password !== password) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = user.jwtToken(); // ✅ Now this works

        user.password = undefined;

        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (e) {
        return res.status(400).json({
            success: false,
            data: e.message
        });
    }
};


module.exports = {
    signup,
    signin

}