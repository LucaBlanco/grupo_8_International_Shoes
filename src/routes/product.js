const {Router} = require('express');
const router = Router();
const {nuevo, listFromDb, carrito, editDb, updateDb, deletedb, createDb, detailsdb} = require('../controllers/products');

const multer = require('multer');
const folder = require('../middlewares/storage');
const req = require('express/lib/request');
const upload = multer({storage: folder()}).single('imagen')

router.get('/', listFromDb)

router.get('/nuevo', nuevo)
router.get('/listadodb', listFromDb) //db
router.post('/guardar', upload, createDb); //db

//db
router.get('/edit/:id', editDb) //db
router.put('/update', upload, updateDb) //db

router.get('/carrito', carrito) //db
router.get('/:id', detailsdb)//db

router.delete('/borrardb', deletedb) //db

module.exports = router;