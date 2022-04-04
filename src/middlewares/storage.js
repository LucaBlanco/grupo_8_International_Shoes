const path = require('path');
const multer = require('multer');

module.exports = () => multer.diskStorage({
    destination: (req, file, cb) => cb(null,path.resolve(__dirname,'../../uploads')),
    filename: (req, file, cb) => cb(null,  file.fieldname + Date.now() + path.extname(file.originalname))
})