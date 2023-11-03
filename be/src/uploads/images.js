const multer = require('multer');
const appRootPath = require('app-root-path');
const fs = require('fs');

module.exports = {
    uploadEvidence: multer({
        limits: {
            fileSize: 3 * 1024 * 1024, // limit 3MB
        },
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const pathProduct = `${appRootPath}/public/images`;
                fs.mkdirSync(pathProduct, { recursive: true });
                cb(null, pathProduct);
            },
            filename: (req, file, cb) => {
                const ext = file.mimetype.split('/')[1];
                cb(null, `${Date.now()}-${file.originalname}`);
            },
        }),
    }),
    
};
