const {readFileSync, writeFileSync, unlinkSync, existsSync} = require('fs');
const {resolve}  = require('path');

const model = {
    file: resolve(__dirname, "../data", "products.json"),
    read: () => readFileSync(model.file),
    list: () => JSON.parse(model.read()),
    convert: data => JSON.stringify(data, null, 2),
    write: data => writeFileSync(model.file, model.convert(data)),
    all: () => model.list().filter(p => p.stock > 0),
    filter: (propiedad, valor) => model.all().filter(p => typeof valor !== "string" ? p[propiedad] == valor : p[propiedad].includes(valor)),
    match:  (propiedad, valor) => model.all().find(p => p[propiedad] == valor),  
    generate: data => Object({
        id: model.list().length > 0 ? model.list().pop().id + 1 : 1,
        //model.list().sort((a,b) => a.id < b.id ? -1: a.id > b.id ? 1 : 0)
        marca: data.marca,
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: Number(data.precio),
        stock: Number(data.stock),
        talle: data.talle,
        imagen: data.imagen_name,
        files: data.files && data.files.length > 0 ? data.files.map(file => file.filename): null,
    }),
    create: data => {
        let lista = model.list().sort((a,b) => a.id < b.id ? -1: a.id > b.id ? 1 : 0);
        lista.push(data);
        model.write(lista);
    },
    trash: id => {
        let productos = model.list().sort((a,b) => a.id < b.id ? -1: a.id > b.id ? 1 : 0);
        model.write(productos.filter(producto => producto.id != id));
    }
}

module.exports = model;