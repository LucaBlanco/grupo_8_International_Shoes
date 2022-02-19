const {Router} = require('express');
const router = Router();
const {index, show, nuevo, storage, editar, modify, trash, details} = require('../controllers/products');

const multer = require('multer');
const folder = require('../middlewares/storage');
const req = require('express/lib/request');
const upload = multer({storage: folder()}).single('imagen')

/** aca debe ir el index de producto, es decir, su listado, no confundir con el index del sitio 
 *  router.get('/', index) <-- index de producto => [http://localhost:3030/productos]
*/

router.get('/nuevo', nuevo)
router.post('/guardar', upload, storage);

router.get('/editar/:id', editar)
router.put('/actualizar', upload, modify)

router.get('/:id', details)

/* router.get('/:id', show) */

/*
router.get('/', index)
router.get('/:id', show)
router.delete('/borrar', trash)
*/
module.exports = router;