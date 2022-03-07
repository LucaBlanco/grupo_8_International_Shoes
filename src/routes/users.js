const {Router} = require('express');
const multer=require('multer');

const {login, auth} = require('../controllers/users');
const {index,deposit}= require('../controllers/user_register');
const router = Router();

const upload=multer({storage});

router.get('/login', login);

router.get('/registro', index)
router.post('/registro/guardar',upload.single('imagenUsuario'),deposit);

router.post('/auth', auth)

module.exports = router;



