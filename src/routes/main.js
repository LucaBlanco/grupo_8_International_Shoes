const {Router} = require('express');
const {index} = require('../controllers/main');
const router = Router();

router.get('/', index);

module.exports = router;