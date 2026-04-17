const ethers = require('ethers');
const UserModel = require('../models/userSchema');
const pinataSDK = require("@pinata/sdk");
require('dotenv').config();
const { generateEncryptionKey } = require('../utils/generateKeys');
const {encryptFile} = require('../utils/encryption');


async function uploadImageController(req, res, next) {

    try {
        const address = req.address;
        const userAddress = address.toLowerCase();
        const user= await UserModel.findOne({userAddress: userAddress});
        if(!user) {
            throw new Error("User not found");
        }
        if(user.encryptionKey === null) {
            const encryptionKey = generateEncryptionKey(32);
            user.encryptionKey = encryptionKey;
            await user.save();
        }

        const {encrypted, iv} = encryptFile(req.file.buffer, user.encryptionKey);

        const pinata = new pinataSDK(
            process.env.PINATA_API_KEY,
            process.env.PINATA_SECRET_KEY
        );
        const resPinata = await pinata.pinJSONToIPFS({encrypted, iv});
        

        res.status(200).json({ipfsHash: resPinata.IpfsHash, message: "Image uploaded successfully" });

    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Failed to upload image" });
    }
}

module.exports = {uploadImageController};