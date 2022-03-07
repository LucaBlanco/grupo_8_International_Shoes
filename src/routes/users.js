const {Router} = require('express');
const multer=require('multer');

const {login, registro, auth, perfil, logout} = require('../controllers/users');
const guestMidle = require('../middlewares/guestMidle')
const authMidle = require('../middlewares/authMidle')

//const {login, auth} = require('../controllers/users');
const {index,deposit}= require('../controllers/user_register');
const router = Router();

//const upload=multer({storage});

router.get('/login', guestMidle, login);

router.get('/registro', guestMidle, index)
router.post('/registro/guardar', /*upload.single('imagenUsuario'),*/ deposit);

router.post('/auth', auth)
router.get('/perfil', authMidle, perfil)
router.get('/logout', logout)


module.exports = router;



