const express=require("express");

const path=require('path');

const app= express();

const publicPath=path.resolve(__dirname,'./public');

app.use( express.static(publicPath) );

app.listen(5000, ()=> {console.log('Servidor corriendo en el puerto 5000');
});

app.get('/',(req, res)=>{
    let rutaIndex= path.resolve('./views/home.html');
    res.sendFile(rutaIndex);
})

app.get('/login',(req, res)=>{
    let rutaIndex= path.resolve('./views/login.html');
    res.sendFile(rutaIndex);
})

app.get('/carrito',(req, res)=>{
    let rutaIndex= path.resolve('./views/carrito.html');
    res.sendFile(rutaIndex);
})
