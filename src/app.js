const express=require("express");
const { resolve } = require('path');
const method = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const cors = require('cors');

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
app.use(cors());

app.set('port', process.env.PORT || 3030);
app.set('host', process.env.HOST ||  process.env.CLIENT_URL || 'http://localhost');
app.set('view engine', 'ejs');
app.set('views',  resolve(__dirname, './views'));
app.use(express.static(resolve(__dirname, '../uploads')));
app.use(express.urlencoded({extended: false}));
app.use(method("m"))

app.listen(app.get('port'), () => console.log('App online => '+app.get('host')+':'+app.get('port')));

app.use(require('./routes/main'));
app.use('/productos', require('./routes/product'));
app.use('/users', require('./routes/users'));
app.use('/api', require('./routes/api'));
//app.use('/api', require('./routes/api'));

app.get('/carrito',(req, res)=>{
    let rutaIndex = resolve('./src/views/product/carrito');
    res.render(rutaIndex);
})

//rutas

app.use(require('./routes/users'));

app.use(require('./routes/users'))
