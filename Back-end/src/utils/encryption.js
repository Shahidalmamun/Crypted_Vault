const crypto = require('crypto');

const encryptFile = (fileBuffer, encryptionKey) => {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), iv);

    const encrypted = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);

    return {encrypted, iv};
}

module.exports = { encryptFile};

