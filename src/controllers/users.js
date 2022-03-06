const fs= require('fs');
const path= require('path');
const{write,list,all,find,create,generate,update,garbage}=require('../models/users');


const users = {

    // PRUEBAS

    // login: (req, res) => res.sendFile(path.resolve(__dirname,'../views','login.ejs')),

    // registro: (req, res) => res.sendFile(path.resolve(__dirname,'../views','registro.ejs'))

    login: (req, res) => res.render('user/login'),

    registro: (req, res) => res.render('user/registro'),
    
    auth:(req, res) => res.render('user/auth') 





};


module.exports = users;

