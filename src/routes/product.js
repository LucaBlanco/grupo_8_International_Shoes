const {Router} = require('express');
const router = Router();
const {index, show, nuevo, storage, editar, modify, trash, details,carrito} = require('../controllers/products');

const multer = require('multer');
const folder = require('../middlewares/storage');
const req = require('express/lib/request');
const upload = multer({storage: folder()}).single('imagen')

/** aca debe ir el index de producto, es decir, su listado, no confundir con el index del sitio 
 *  router.get('/', index) <-- index de producto => [http://localhost:3030/productos]
*/
router.get('/', index)

router.get('/nuevo', nuevo)
router.post('/guardar', upload, storage);

router.get('/editar/:id', editar)
router.put('/actualizar', upload, modify)

//carrito debe ir antes que detalle de producto para que no se confunda /'producto' con un :id
router.get('/carrito', carrito)
router.get('/:id', details)


router.delete('/borrar', trash)

/*
router.get('/', index)
router.delete('/borrar', trash)
*/
module.exports = router;