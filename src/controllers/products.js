const {all, filter, match, generate, create, list, write, trash} = require('../models/product');
const controller = {
    nuevo: (req, res) => res.render('product/crear', {title: 'Crear'}),
    storage: (req, res) => {
        req.body.file = req.file;
        const nuevo = generate(req.body);
        create(nuevo);
        return res.redirect('/productos/'+nuevo.id);
    }
}

module.exports = controller