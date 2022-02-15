const {Router} = require('express');

const {login} = require('../controllers/users');

const {registro} = require('../controllers/users');

const router = Router();

router.get('/login', login);

router.get('/registro', registro)

module.exports = router;



