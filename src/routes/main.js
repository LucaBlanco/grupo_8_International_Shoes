const {Router} = require('express');
const {index, details} = require('../controllers/main');
const router = Router();

router.get('/', index);

module.exports = router;