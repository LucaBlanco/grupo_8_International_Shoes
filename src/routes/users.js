const {Router} = require('express');
const multer=require('multer');

const {login, registro, auth, perfil} = require('../controllers/users');

const {login, auth} = require('../controllers/users');
const {index,deposit}= require('../controllers/user_register');
const router = Router();

const upload=multer({storage});

router.get('/login', login);

router.get('/registro', index)
router.post('/registro/guardar',upload.single('imagenUsuario'),deposit);

router.post('/auth', auth)
router.get('/perfil', perfil)


module.exports = router;



