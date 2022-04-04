const {Router} = require('express');
const multer=require('multer');

const {login, auth, perfil, logout, listFromDb, editDb, updateDb, deletedb, createDb} = require('../controllers/users');
const guestMidle = require('../middlewares/guestMidle')
const authMidle = require('../middlewares/authMidle')
const folder = require('../middlewares/users_img');

//const {index, deposit}= require('../controllers/user_register');
//const { create } = require('../models/product');
const router = Router();

const upload=multer({storage: folder()}).single('image')

router.get('/login', guestMidle, login);

router.get('/registro', guestMidle, login)
router.post('/registro/guardardb', upload, createDb);//db

router.get('/list', listFromDb) //db
router.get('/edit/:id', editDb) //db
router.post('/edit/:id', upload, updateDb) //db
router.delete('/borrardb', deletedb) //db

router.post('/auth', auth)
router.get('/perfil', authMidle, perfil)
router.get('/logout', logout)

module.exports = router;



