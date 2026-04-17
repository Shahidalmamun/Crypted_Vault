const ethers = require('ethers');
const UserModel = require('../models/userSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();



async function authController(req, res, next) {

    const {signature} = req.body;
    const {address} = req.query;

    try {
        if(!signature) {
        throw new Error('Signature is invalid');
        }
        const recoveredAddress = ethers.utils.verifyMessage("Welcome to Crypto Vault!",signature)
        if(recoveredAddress.toLowerCase() === address.toLowerCase()) {
            const address = recoveredAddress.toLowerCase();
            const user = await UserModel.findOne({ userAddress: address });
            if(!user) {
               const userData = await UserModel.create({userAddress: address});
               console.log('New user created:', userData);
            }

            const token = jwt.sign({
                address
            }, process.env.JWT_SECRET);
            
            res.json({message: 'Authentication successful',token});
        } else {
            res.status(401).json({error: 'Authentication failed'});
        }

    } catch (error) {
            console.error('Error verifying signature:', error);
            res.status(500).json({ error: 'Invalid signature' });
        }
}

module.exports = {authController};