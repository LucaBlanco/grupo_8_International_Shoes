const {Router} = require('express');
const multer=require('multer');

const {login, registro, auth, perfil} = require('../controllers/users');

const router = Router();

router.get('/login', login);

router.get('/registro', registro)

router.post('/auth', auth)
router.get('/perfil', perfil)


module.exports = router;



