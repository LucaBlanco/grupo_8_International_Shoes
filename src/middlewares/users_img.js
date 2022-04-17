const path = require('path');
const multer = require('multer');

module.exports = () => multer.diskStorage({
     destination:(req,file,cb)=>
     { let folder =path.resolve(__dirname,'../../uploads/profileImages');
       cb(null,folder);
     },
     filename:(req,file,cb) =>{
         let imageName=Date.now()+ path.extname(file.originalname);

         //Para validad el tipo de imagen con express-validator
         req.body.imageType = file.mimetype; 

         cb(null,imageName);

     }
 })

