const express=require("express");
const { resolve } = require('path');
const method = require('method-override');
const app= express();

const publicPath= resolve(__dirname,'../public');

app.use( express.static(publicPath) );

app.set('view engine', 'ejs');
app.set('views',  resolve(__dirname, './views'));
app.use(express.static(resolve(__dirname, '../uploads')));
app.use(express.urlencoded({extended: false}));
app.use(method("m"))

app.listen(process.env.PORT || 3030, function() {
    console.log('servidor corriendo en puerdo 3030');
})

app.use(require('./routes/main')) /*Esto si*/
app.use('/productos', require('./routes/main')) /*Esto no, en controllers/main no debe haber cosas de productos*/

app.use('/productos', require('./routes/product'))



/* pasar todo esto a sus rutas de usuario o producto*/

// app.get('/login',(req, res)=>{
//     let rutaIndex = resolve('./src/views/user/login');
//     res.render(rutaIndex);
// })
// app.get('/registro',(req, res)=>{
//     let rutaIndex = resolve('./src/views/user/registro');
//     res.render(rutaIndex);
// })

app.get('/carrito',(req, res)=>{
    let rutaIndex = resolve('./src/views/product/carrito');
    res.render(rutaIndex);
})

//rutas

app.use(require('./routes/users'));

app.use(require('./routes/users'))

