const session = require('express-session');
const fs= require('fs');
const path= require('path');
const{write,list,all,find,create,generate,update,garbage}=require('../models/users');


const users = {   
    login: (req, res) => res.render('user/login'),
    registro: (req, res) => res.render('user/registro'),

    auth:(req, res) =>{
        let userArr2 = JSON.parse(JSON.stringify(userArr));
        let userToLogin = userArr2.find(user => user.email==req.body.user);
        if(userToLogin){
            if(userToLogin.password == req.body.password){
                delete userToLogin.password;
                req.session.usuarioLogueado = userToLogin;
                return res.redirect('./perfil')                
            }
        }
        return res.render('user/login', {
            errors: {
                email:{
                    msg: "Credenciales invalidas"
                }
            }
        })
    },
    perfil: (req, res) => {
        console.log(req.session);
        res.render('user/profile')
    }
}


let userArr =  [
    {"id":1,"first_name":"Elise","last_name":"Ribeiro","date_of_birth":"2004-12-08","phone_number":"+86 (643) 795-1229","email":"eribeiro0@who.int","password":"vRARgB5","category":"user","image":"user_1.jpg"},
    {"id":2,"first_name":"Gwenni","last_name":"Wivell","date_of_birth":"1983-03-22","phone_number":"+48 (425) 210-5589","email":"gwivell1@studiopress.com","password":"fDdY6xjdt2","category":"user","image":"user_2.jpg"},
    {"id":3,"first_name":"Arielle","last_name":"O'Mailey","date_of_birth":"2018-09-21","phone_number":"+62 (320) 778-9029","email":"aomailey2@yahoo.com","password":"qPuZvAoFCl","category":"user","image":"user_3.jpg"},
    {"id":4,"first_name":"Junia","last_name":"Skrine","date_of_birth":"2015-06-19","phone_number":"+62 (599) 829-1372","email":"jskrine3@networkadvertising.org","password":"kfNhjwwAWSvh","category":"user","image":"user_4.jpg"}
]

module.exports = users;

