const {all, filter, match, generate, create, list, write, trash} = require('../models/product');

const db = require('../database/models');

const controller = {
    index: (req, res) => {
        const {search} = req.query;
        return search ? res.render('product/listado',{
            title: 'Search | '+search,
            productos: filter('marca', search)
        }) : res.render('product/listado',{
            title: 'Product List',
            productos: all()
        })
    },
    //with DB
    listFromDb: (req, res) => {
        db.Products.findAll()
            .then(function(productos) {
                res.render('product/listado', { productos: productos })
            })
    },
    editDb: (req, res) => {
        db.Products.findByPk(req.params.id)
            .then(function(producto){
                res.render('product/productEdit', {producto:producto});
            })
    },
    updateDb: (req, res) => {
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
            console.log(req.body.id, req.body.talle, req.body.marca),
            res.send("ok, aca renderizaría detalle_producto")
        )
    },

    //json
    nuevo: (req, res) => res.render('product/crear', {title: 'Crear'}),
    storage: (req, res) => {
        req.body.file = req.file;
        req.body.imagen_name = req.file.filename;
        const nuevo = generate(req.body);
        create(nuevo);
        return res.redirect('/productos/'+nuevo.id);
    },
    editar: (req, res) => {
        const {id} = req.params;
        let producto = id ? match('id', id) : null; 
        return producto ? res.render('product/editar_producto', {
            title: 'Editando producto '+id,
            producto: producto
        }) : res.render('error', {error: "No se encontro nada"});
    },
    modify: (req, res) => {
        req.body.imagen_name = req.file.filename;
        let productos = list().sort((a,b) => a.id < b.id ? -1: a.id > b.id ? 1 : 0);
        productos = productos.map((producto) =>{
            if(producto.id == req.body.id){
                producto.nombre = req.body.nombre;
                producto.precio = req.body.precio;
                producto.descripcion = req.body.descripcion;
                producto.stock = req.body.stock;
                producto.talle = req.body.talle;
                //producto.files = data.files && data.files.length > 0 ? data.files.map(file => file.filename): null;
                producto.files = req.file && req.file.length > 0 ? req.file.map(file => file.filename): null;
                producto.imagen = req.body.imagen_name;
                return producto;
            }
            return producto;
        })
        write(productos)
        return res.redirect('/productos/'+req.body.id);
    },
    details:(req,res)=> {
        const{id}=req.params //se usa params porque viene de la ruta
        let producto=id ?  match('id',id) : null //si hay un producto con un id que lo busque y si no lo hay es null//
        return producto ? res.render('product/detalle_producto',{
            title: 'Product', producto: producto
        }): res.render( 'error', {title: 'Error' ,error: 'No se encontro ningún producto'})
    },
    carrito:(req, res) => {
        res.render('product/carrito')
    },
    trash: (req, res) => {
        trash(req.body.id);
        return res.redirect('/productos');
    }
}

module.exports = controller