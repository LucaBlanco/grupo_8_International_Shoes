const express=require("express");
const path=require('path');
const app= express();

const publicPath=path.resolve(__dirname,'./public');

app.use( express.static(publicPath) );

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

app.listen(5000, ()=> {console.log('Servidor corriendo en el puerto 5000')});

app.get('/',(req, res)=>{
    let rutaIndex= path.resolve('./src/views/home');
    res.render(rutaIndex);
})

app.get('/login',(req, res)=>{
    let rutaIndex= path.resolve('./views/login.html');
    res.sendFile(rutaIndex);
})
app.get('/registro',(req, res)=>{
    let rutaIndex= path.resolve('./views/registro.html');
    res.sendFile(rutaIndex);
})

app.get('/carrito',(req, res)=>{
    let rutaIndex= path.resolve('./src/views/product/carrito');
    res.render(rutaIndex);
})
app.get('/producto',(req, res)=>{
    let rutaIndex= path.resolve('./src/views/product/detalle_producto');
    res.render(rutaIndex);
})

app.get('/crear',(req, res)=>{
    let rutaIndex= path.resolve('./src/views/product/crear');
    res.render(rutaIndex);
})
app.get('/editar',(req, res)=>{
    let rutaIndex= path.resolve('./src/views/product/editar');
    res.render(rutaIndex);
})