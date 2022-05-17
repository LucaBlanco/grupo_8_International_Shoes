const { validationResult } = require('express-validator');
const db = require('../database/models');

const controller = {
    listFromDb: async (req, res) => {
        try {
            await db.Products.findAll({include: [{association: "talles"}]})
                .then(function(productos) {
                    res.render('product/listado', { productos: productos })
                })            
        } catch (error) {
            res.render('error', {error:error})
        }

    },
    detailsdb: (req, res) => {
        db.Products.findOne({ 
            where: {
                id: req.params.id
            },
            include: [{association: "talles"}]
            })
            .then(function(producto){
                res.render('product/detalle_producto', {producto:producto});
            })
    },
    createDb: async (req, res) => {
        if(req.file){
            req.body.imagen = req.file.filename;
        }
        let errors = validationResult(req);
        if (!errors.isEmpty()) {

            console.log('body:', req.body);
            console.log('Error:', errors);
            console.log('req.file:', req.file);

            return res.render('product/crear', { 
                errors: errors.array(),
                old: req.body,
                formType: "create"
            });
        }
        console.log('rreq.body.talles:', req.body.talle);

        let productCreated;
        try {
            productCreated = await db.Products.create({
                marca: req.body.marca,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                stock: req.body.stock,
                talle: req.body.talle,
                image: req.body.imagen
            })
        } catch (error) {
            res.render('error', {error:error})
        }
        if (productCreated) {
            try {
                req.body.talle.forEach( async talle => {
                    await db.products_sizes.create({
                        productId: productCreated.id,
                        sizeId: talle
                    })
                });
                res.redirect('listadodb');                   
            } catch (error) {
                res.render('error', {error:error})
            }

        }
    },
    editDb: async (req, res) => {
        let productToEdit;
        try {
            productToEdit = await db.Products.findByPk(req.params.id)
        }catch (error) {
            res.render('error', {error:error})
        }
        if(productToEdit){
            res.render('product/productEdit', {producto:productToEdit, formType : "create"});
        }else{
            res.render('error', {error:"No se encontró el producto"})
        }
    },
    updateDb: (req, res) => {
        if (req.session.usuarioLogueado) {
            if(req.file){
                req.body.imagen = req.file.filename;
            }

            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('product/productEdit', { 
                    errors: errors.array(),
                    old: req.body,
                    producto: req.body,
                    formType : "create"
                });
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
        }else{
            return res.render('user/login', { 
                errors: {
                    email:{
                        msg: "Debes loguearte para realizar esta acción"
                    }
                },
                old: req.body,
                formType: "login"
            });    
        }

    },
    deletedb: (req, res) =>{
        if (req.session.usuarioLogueado) {
            db.Products.destroy({
                where: {
                    id: req.body.id
                }
            })
            .then(
                res.redirect('listadodb')
            )    
        }else{
            return res.render('user/login', { 
                errors: {
                    email:{
                        msg: "Debes loguearte para realizar esta acción"
                    }
                },
                old: req.body,
                formType: "login"
            });    
        }
    },

    //json
    nuevo: (req, res) => res.render('product/crear', {title: 'Crear', formType: "create"}),
    carrito:(req, res) => {
        res.render('product/carrito')
    }
}

module.exports = controller