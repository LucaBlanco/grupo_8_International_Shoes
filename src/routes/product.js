const {Router} = require('express');
const router = Router();
const {index, show, nuevo, listFromDb, storage, editar, modify, trash, details,carrito} = require('../controllers/products');

const multer = require('multer');
const folder = require('../middlewares/storage');
const req = require('express/lib/request');
const upload = multer({storage: folder()}).single('imagen')

router.get('/', index)

router.get('/nuevo', nuevo)
router.get('/listadodb', listFromDb) //db
router.post('/guardar', upload, storage);

router.get('/editar/:id', editar)
router.put('/actualizar', upload, modify)


router.get('/carrito', carrito)
router.get('/:id', details)

router.delete('/borrar', trash)

module.exports = router;