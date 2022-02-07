const {Router} = require('express');
const router = Router();
const {index, show, nuevo, storage, update, modify, trash} = require('../controllers/products');



//router.get('/:id', show)
router.get('/nuevo', nuevo)
router.post('/guardar', storage)
/*
const multer = require('multer');
const folder = require('../middlewares/storage');
const upload = multer({storage: folder()})


router.get('/', index)

router.get('/:id', show)
router.get('/editar/:id', update)


router.post('/guardar', [upload.any()], storage)
router.put('/actualizar', [upload.any()], modify)

router.delete('/borrar', trash)
*/
module.exports = router;