const path = require('path');
const multer = require('multer');

module.exports = () => multer.diskStorage({
    destination: (req, file, cb) => cb(null,path.resolve(__dirname,'../../uploads')),
    filename: (req, file, cb) => cb(null,  file.fieldname + Date.now() + path.extname(file.originalname))
})







/*esto tengo que agregar a otro archivo dentro de middlewares para usar en los avatars del usuario

const path = require('path');
const multer = require('multer');

module.exports = () => multer.diskStorage({
     destination:(req,file,cb)=>
     { let folder =path.resolve(__dirname,'../uploads/profileImages');
       cb(null,folder);
     },
     filename:(req,file,cb) =>{
         let imageName=Date.now()+ path.extname(file.originalname);
         cb(null,imageName);

     }
 }) */