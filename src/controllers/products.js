const {all, filter, match, generate, create, list, write, trash} = require('../models/product');
const controller = {
    nuevo: (req, res) => res.render('product/crear', {title: 'Crear'}),
    storage: (req, res) => {
        req.body.file = req.file;
        const nuevo = generate(req.body);
        console.log("imagen:" + req.body.file);
        console.log("file:" + req.file);
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
        let productos = list().sort((a,b) => a.id < b.id ? -1: a.id > b.id ? 1 : 0);
        productos = productos.map((producto) =>{
            if(producto.id == req.body.id){
                producto.nombre = req.body.nombre;
                producto.precio = req.body.precio;
                producto.descripcion = req.body.descripcion;
                producto.stock = req.body.stock;
                producto.talle = req.body.talle;
                producto.files = data.files && data.files.length > 0 ? data.files.map(file => file.filename): null;
                producto.imagen = req.body.imagen_name;
                return producto;
            }
            return producto;
        })
        write(productos)
        return res.redirect('/productos/'+req.body.id);
    }
}

module.exports = controller