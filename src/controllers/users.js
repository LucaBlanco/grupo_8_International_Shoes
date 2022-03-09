const session = require('express-session');
const fs= require('fs');
const path= require('path');
const bcryptjs = require('bcryptjs');
const{write,list,all,find, match, create,generate,update,garbage}=require('../models/users');

const users = {   
    login: (req, res) => res.render('user/login'),
    registro: (req, res) => res.render('user/registro'),

    auth:(req, res) =>{
        let userToLogin = match('email', req.body.user);
        if(userToLogin){
            let pwdOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if(pwdOk){
                delete userToLogin.password;
                req.session.usuarioLogueado = userToLogin;

                if (req.body.remember_user) {
                    res.cookie('userEmail', req.body.user, {maxAge: (1000 *60) * 5})
                }

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
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();        
        return res.redirect('/')
    },
    perfil: (req, res) => {
        res.render('user/profile', {
            user: req.session.usuarioLogueado
        });
    }
}

module.exports = users;