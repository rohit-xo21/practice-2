const jwt = require('jsonwebtoken');

const middleware = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({success:false, message: 'Access denied'})
        }
        const decoded = jwt.verify(token, 'secret');

        req.existingUser = decoded;
        next();

    } catch(error){
        res.status(401).json({success:false, message: error.message});
    }
}

module.exports = middleware;