const jwt = require("jsonwebtoken");
require('dotenv').config()
const jwt_key = process.env.JWT_KEY


function verifyToken(req,res,next){
    const token = req.header("Authorization")?.split(" ")[1];
    if(!token){        
        return res.status(401).json({error:"Access Denied"})
    }
    try {
        const decoded = jwt.verify(token,jwt_key)
        req.userId = decoded.user._id;
        next();
    } catch (error) {
        res.status(401).json({error:"Invalid Token"})
    }
}

module.exports = verifyToken;