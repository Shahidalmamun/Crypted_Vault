const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authenticateToken(req, res, next) {

    try{
        const token = req.headers['x-access-token']
        if(!token){
            throw new Error('No token provided');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.address = decoded.address;
        next();
    }
    catch(error){
        console.error('Error authenticating token:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
}

module.exports = {authenticateToken};