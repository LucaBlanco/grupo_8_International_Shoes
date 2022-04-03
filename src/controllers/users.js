const session = require('express-session');
const fs= require('fs');
const path= require('path');
const bcryptjs = require('bcryptjs');
const{write,list,all,find, match, create,generate,update,garbage}=require('../models/users');

const db = require('../database/models');

const users = {   
    login: (req, res) => res.render('user/login'),
    registro: (req, res) => res.render('user/registro'),
    //with DB
    listFromDb: (req, res) => {
        db.Users.findAll()
            .then(function(users) {
                res.render('user/list', { users: users })
            })
    },
    createDb: (req, res) => {
        db.Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            password: bcryptjs.hashSync(req.body.password, 10),
            birthDate: req.body.birthDate,
            country: req.body.country,
            province: req.body.province,
            city: req.body.city,
            address: req.body.address,
            image: req.body.image
        })
    },
    editDb: (req, res) => {
        db.Users.findByPk(req.params.id)
            .then(function(user){
                res.render('user/userEdit', {user:user});
            })
    },
    updateDb: (req, res) => {
        if(req.file){
            req.body.image = req.file.filename;
        }
        db.Users.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            //password: bcryptjs.hashSync(req.body.password, 10), mejor usar otro metodo para hacer update de password
            birthDate: req.body.birthDate,
            country: req.body.country,
            province: req.body.province,
            city: req.body.city,
            address: req.body.address,
            image: req.body.image
        },
        {
            where: {id: req.params.id}
        }
        ).then(
            res.send("ok, aca renderizaría el perfil")
        )
    },
    deletedb: (req, res) =>{
        db.Users.destroy({
            where: {
                id: req.body.id
            }
        })
        .then(
            res.redirect('list')
        )
    },
    //with JSON
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