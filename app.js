const express=require("express");
const path=require('path');
const app= express();

const publicPath=path.resolve(__dirname,'./public');

app.use( express.static(publicPath) );

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

app.set('port', process.env.PORT || 3030);
app.listen(app.get('port', () => console.log('listening on port http://localhost:3030'+ app.get('port'))));

app.get('/',(req, res)=>{
    let rutaIndex= path.resolve('./src/views/home');
    res.render(rutaIndex);
})

app.get('/login',(req, res)=>{
    let rutaIndex= path.resolve('./src/views/user/login');
    res.render(rutaIndex);
})
app.get('/registro',(req, res)=>{
    let rutaIndex= path.resolve('./src/views/user/registro');
    res.render(rutaIndex);
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