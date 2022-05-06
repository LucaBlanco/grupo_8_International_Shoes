const {Router} = require('express');
const multer=require('multer');
const { body } = require('express-validator');
const {login, auth, perfil, logout, listFromDb, editDb, updateDb, deletedb, registro, createUser } = require('../controllers/users');
const guestMidle = require('../middlewares/guestMidle')
const authMidle = require('../middlewares/authMidle')
const folder = require('../middlewares/users_img');

const router = Router();

const upload=multer({storage: folder()}).single('image')

const createValidator = [
    body("firstName").notEmpty().isLength({ min: 2, max:65 }).withMessage('El nombre no puede estar vacío y debe tener al menos 2 caracteres.'),
    body("lastName").notEmpty().withMessage('El apellido no puede estar vacío.'),
    body("email").isEmail().withMessage('Debes ingresar un email válido.'),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      }).withMessage('La contraseña deberá contener al menos 1 letra mayúscula, 1 minúscula, un número, un carácter especial y 8 caracteres de longitud mínima.'),
    body("imageType").isIn([ 'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', undefined ]).withMessage('El tipo de imagen no es válido, debe ser: JPG, JPEG, PNG, GIF.'),
];
const authValidator = [
    body("user").isEmail().withMessage('Debes ingresar un email válido.'),
    body("password").notEmpty().withMessage('Olvidaste ingresar la contraseña.'),
];

router.get('/login', guestMidle, login);

router.get('/registro', guestMidle, registro)
router.post('/registro/guardardb', upload, createValidator, createUser);//db

router.get('/', authMidle, listFromDb) //db
router.get('/list', authMidle, listFromDb) //db
router.get('/edit/:id', editDb) //db
router.post('/edit/:id', upload, updateDb) //db
router.delete('/borrardb', deletedb) //db

router.post('/auth', authValidator, auth)
router.get('/perfil', authMidle, perfil)
router.get('/logout', logout)

module.exports = router;