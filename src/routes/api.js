const {Router} = require('express');
const { detailsUsers, listUsers, listProducts, detailsProducts } = require('../controllers/api');
const guestMidle = require('../middlewares/guestMidle')
const authMidle = require('../middlewares/authMidle')

const router = Router();


router.get('/products', listProducts)
router.get('/products/:id', detailsProducts)

router.get('/users', listUsers)
router.get('/users/:id', detailsUsers) 

/*
    router.post('/auth', auth)
    router.get('/perfil', perfil)
    router.get('/logout', logout)
*/
module.exports = router;