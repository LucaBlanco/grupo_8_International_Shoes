const express=require("express");
const { resolve } = require('path');
const method = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');

const app= express();

const isLoggedMidle = require('./middlewares/isLoggedMidle');

const publicPath= resolve(__dirname,'../public');
app.use( express.static(publicPath) );


app.use(session({
    secret: 't[%H+>mg`GKDG4F$',
    resave: false,
    saveUninitialized: false
}));

app.use(cookies());
app.use(isLoggedMidle);

app.set('view engine', 'ejs');
app.set('views',  resolve(__dirname, './views'));
app.use(express.static(resolve(__dirname, '../uploads')));
app.use(express.urlencoded({extended: false}));
app.use(method("m"))

app.listen(process.env.PORT || 3030, function() {
    console.log('servidor corriendo en puerto 3030');
})

app.use(require('./routes/main'));
app.use('/productos', require('./routes/product'));
app.use('/users', require('./routes/users'));
app.get('/carrito',(req, res)=>{
    let rutaIndex = resolve('./src/views/product/carrito');
    res.render(rutaIndex);
})


//rutas

app.use(require('./routes/users'));

app.use(require('./routes/users'))

