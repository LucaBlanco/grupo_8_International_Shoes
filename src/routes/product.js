const {Router} = require('express');
const router = Router();
const { body } = require('express-validator');
const {nuevo, listFromDb,  editDb, updateDb, deletedb, createDb, detailsdb} = require('../controllers/products');
const { listItem, addItem } = require('../controllers/carrito');
const authMidle = require('../middlewares/authMidle')

const createUpdateValidator = [
    body("nombre").notEmpty().isLength({ min: 5, max:65 }).withMessage('El nombre no puede estar vacío y debe tener al menos 5 caracteres.'),
    body("descripcion").notEmpty().isLength({ min: 20, max:10254 }).withMessage('La descripcion nombre no puede estar vacía y debe tener al menos 20 caracteres.'),
    body("imageType").isIn([ 'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', undefined ]).withMessage('El tipo de imagen no es válido, debe ser: JPG, JPEG, PNG, GIF.'),
];

const multer = require('multer');
const folder = require('../middlewares/storage');
const req = require('express/lib/request');
const upload = multer({storage: folder()}).single('imagen')

router.get('/', listFromDb)

router.get('/nuevo', nuevo)
router.get('/listadodb', listFromDb) //db
router.post('/guardar', upload, createUpdateValidator, createDb); //db

//db
router.get('/edit/:id', authMidle, editDb) //db
router.put('/update', upload, createUpdateValidator, updateDb) //db

router.get('/carrito', listItem) //db
router.get('/carrito/:id', addItem) //db

router.get('/:id', detailsdb)//db

router.delete('/borrardb', deletedb) //db

module.exports = router;