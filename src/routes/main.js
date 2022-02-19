const {Router} = require('express');
const {index, details} = require('../controllers/main');
const router = Router();

router.get('/', index);
/* router.get('/:id', details)  */

module.exports = router;