const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || null;

    if(!token){
        return res.status(400).json({
            success: false,
            message: 'Token does not exist'
        })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.id, email: payload.email};
    } catch(e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
    next();
}

module.exports = jwtAuth;