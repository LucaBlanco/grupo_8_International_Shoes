const db = require('../database/models');

const controller = {
    listFromDb: (req, res) => {
        db.Products.findAll()
            .then(function(productos) {
                res.render('product/listado', { productos: productos })
            })
    },
    detailsdb: (req, res) => {
        db.Products.findByPk(req.params.id)
            .then(function(producto){
                res.render('product/detalle_producto', {producto:producto});
            })
    },
    createDb: (req, res) => {
        if(req.file){
            req.body.imagen = req.file.filename;
        }
        db.Products.create({
            marca: req.body.marca,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,
            talle: req.body.talle,
            image: req.body.imagen
        }).then(
            res.redirect('listadodb')
        )
    },
    editDb: (req, res) => {
        db.Products.findByPk(req.params.id)
            .then(function(producto){
                res.render('product/productEdit', {producto:producto});
            })
    },
    updateDb: (req, res) => {
        if(req.file){
            req.body.imagen = req.file.filename;
            console.log(req.file.filename);
        }
        db.Products.update({
            marca: req.body.marca,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,
            talle: req.body.talle,
            image: req.body.imagen
        },
        {
            where: {id: req.body.id}
        }
        ).then(
            res.redirect('/productos/'+req.body.id)
        )
    },
    deletedb: (req, res) =>{
        db.Products.destroy({
            where: {
                id: req.body.id
            }
        })
        .then(
            res.redirect('listadodb')
        )
    },

    //json
    nuevo: (req, res) => res.render('product/crear', {title: 'Crear'}),
    carrito:(req, res) => {
        res.render('product/carrito')
    }
}

module.exports = controller