const {readFileSync,writeFileSync,unlinkSync,existsSync} =require('fs'); 
const {resolve} = require('path');
const model={
    file: resolve(__dirname,"../data","products.json"),
    read: ()=>readFileSync(model.file),
    list:() => JSON.parse(model.read()), 
    all: () => model.list().filter(producto => producto.stock> 0),
    filter: (propiedad, valor) => model.all().filter(producto => typeof valor !== "string" ? producto[propiedad] == valor :producto[propiedad].includes(valor)),


}
module.exports = model;