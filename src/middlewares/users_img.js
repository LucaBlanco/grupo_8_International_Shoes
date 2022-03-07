const path = require('path');
const multer = require('multer');

const multerDiskStorage=multer.diskStorage({
     destination:(req,file,cb)=>
     { let folder =path.resolve(__dirname,'../uploads/profileImages');
       cb(null,folder);
     },
     filename:(req,file,cb) =>{
         let imageName=Date.now()+ path.extname(file.originalname);
         cb(null,imageName);

     }
 })