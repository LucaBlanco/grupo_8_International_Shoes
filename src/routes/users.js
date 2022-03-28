const {Router} = require('express');
const multer=require('multer');

const {login, registro, auth, perfil, logout, listFromDb} = require('../controllers/users');
const guestMidle = require('../middlewares/guestMidle')
const authMidle = require('../middlewares/authMidle')
const folder = require('../middlewares/users_img');

const {index, deposit}= require('../controllers/user_register');
const { create } = require('../models/product');
const router = Router();

const upload=multer({storage: folder()}).single('image')

router.get('/login', guestMidle, login);

router.get('/registro', guestMidle, index)
router.post('/registro/guardar', upload, deposit);

router.get('/list', listFromDb) //db

router.post('/auth', auth)
router.get('/perfil', authMidle, perfil)
router.get('/logout', logout)


module.exports = router;



