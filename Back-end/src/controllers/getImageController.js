const UserModel = require('../models/userSchema');
require('dotenv').config();
const {decryptData} = require('../utils/decryption')
const axios = require('axios')
const PINATA_GATEWAY_URL ='https://gateway.pinata.cloud/ipfs/'


async function returnIpfsResponse(ipfsHash){
    const response = await axios(`${PINATA_GATEWAY_URL}${ipfsHash}`)
    return response.data;
}

async function getImageController(req, res, next) {

    try {
        const address = req.address;
        const userAddress = address.toLowerCase();
        const user= await UserModel.findOne({userAddress: userAddress});

        if(!user) {
            throw new Error("User not found");
        }

        const {page, limit} = req.query;
        const pageNumber= parseInt(page) || 1;
        const limitNumber= parseInt(limit) || 1;

        if(pageNumber < 1 || limitNumber < 1){
            throw new Error('Paigination issue')
        }
        const startIndex=(pageNumber - 1) * limitNumber;
        const endIndex= pageNumber * limitNumber;
        
        const ipfsHashArray = req.body.slice(startIndex, Math.min(req.body.length, endIndex))
        const decryptedImageArr=[]

        if(ipfsHashArray.length !== 0){
            const encryptedDataArr = await Promise.all(ipfsHashArray.map(async(ipfsHash)=>{
                const res = await returnIpfsResponse(ipfsHash)
                return res;
            }))

            for(const img of encryptedDataArr){
                const decryptedImgData = decryptData(img.encrypted, img.iv, user.encryptionKey)
                decryptedImageArr.push(decryptedImgData.toString('base64'))
            }
        }

        console.log(decryptedImageArr)

    
        res.status(200).json({message: "Image sent successfully", decryptedImageArr});

    } catch (error) {
        console.error("Error sending image:", error);
        res.status(500).json({ error: "Failed to send image" });
    }
}

module.exports = {getImageController};