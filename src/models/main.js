const {readFileSync,writeFileSync,unlinkSync,existsSync} =require('fs'); //4 funciones que vamos a usar del modulo de fs// 
const {resolve} = require('path');
const model={
    file: resolve(__dirname,"../data","products.json"),
    read: ()=>readFileSync(model.file),
    list:() => JSON.parse(model.read()),  //convertir el contenido de esto que es un array, para interpretarlo desde el lado del java scrip//
    all: () => model.list().filter(producto => producto.stock> 0),/*del resultado que obtenga del list, voy a filtrar a 
    todos aquellos productos(c/u de los objetos que tenga metidos dentro del array) cuyo stock sea mayor a cero. 
    Es decir, que me aseguro que haya stock del producto*/
    filter: (propiedad, valor) => model.all().filter(producto => typeof valor !== "string" ? producto[propiedad] == valor :producto[propiedad].includes(valor)),
/*type of: es una funcion que me define el tipo de variable que guarda VALOR
includes:es un método de strings para saber si una palabra esta incluida o no dentro de otra cadena de texto.
filter(propiedad,valor): sirve para buscar coincidencias en la lista de productos(basados en su propiedad y valor) que hay en Products.json, y uso filter
porque quiero que me devuelva un ARRAY (ojo no confuncir con el metodo FIND (Que solo me devuelve un solo valor)) */
    /* match: (propiedad,valor)=>model.all().find(producto => producto[propiedad] == valor) */
     //encuentra 1 solo valor//
    /*propiedad y valor lo damos desde el controlllers y lo parseamos en el controlador*/ 

}
module.exports = model;