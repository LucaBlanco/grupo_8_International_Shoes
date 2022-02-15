const {Router} = require('express');

const {login, registro} = require('../controllers/users');

const router = Router();

router.get('/login', login);

router.get('/registro', registro)

module.exports = router;



