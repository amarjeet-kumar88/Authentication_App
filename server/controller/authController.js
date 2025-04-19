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

module.exports = {
    signup
}