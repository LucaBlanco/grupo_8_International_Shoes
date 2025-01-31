const session = require('express-session');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const controller = require('./products');

const users = {   
    login: (req, res) => res.render('user/login', {formType: "login"}),
    registro: (req, res) => res.render('user/registro', {formType: "register"}),
    listFromDb: (req, res) => {
        db.Users.findAll()
            .then(function(users) {
                res.render('user/list', { users: users })
            })
    },
    editDb: async (req, res) => {
        let userToEdit;
        try {
            userToEdit = await db.Users.findByPk(req.params.id)
        }catch (error) {
            res.render('error', {error:error})
        }
        if(userToEdit){
            res.render('user/userEdit', {user:userToEdit});
        }else{
            res.render('error', {error:"No se encontró el usuario"})
        }
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
            res.redirect('/list')
        )
    },
    deletedb: (req, res) =>{
        db.Users.destroy({
            where: {
                id: req.body.id
            }
        })
        .then(
            controller.logout
        )
        .then(
            res.redirect('list')
        )
    },
    auth: async (req, res) =>{

        let error = validationResult(req);
        let userExist; 
        if (!error.isEmpty()) {
            return res.render('user/login', { 
                error: error.array(),
                old: req.body,
                formType: "login"
            });
        }       

        let userToLogin;
        try {
            userToLogin = await db.Users.findOne({ where: { email: req.body.user } })
        }catch (error) {
            console.error('Error:', error);
        }
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
            },
            old: req.body,
            formType: "login"
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
    },
    // emailExist: async (req,res)=> {
    //     let userExist;
    //     try {
    //         userExist = await db.Users.findOne({ where: { email: req.body.email } })
    //     }catch (error) {
    //         console.error('Error:', error);
    //     }
    //     if(userExist){
    //         res.json({exist:"yes"})
    //     }else{
    //         res.json({exist:"no"})
    //     }
    // },
    createUser: async (req,res)=> {
        if(req.file){
            req.body.image = req.file.filename;
        }
        let errors = validationResult(req);
        let userExist; 
        if (!errors.isEmpty()) {
            /*
            console.log('body:', req.body);
            console.log('Error:', errors);
            console.log('req.file:', req.file);
            */
            return res.render('user/registro', { 
                errors: errors.array(),
                old: req.body,
                formType: "register"
            });
        }
        try {
            userExist = await db.Users.findOne({ where: { email: req.body.email } })
        }catch (error) {
            console.error('Error:', error);
        }
        if (userExist) {
            return res.render('user/registro', {
                emailExist: {
                    registro:{
                        msg: "Email ya registrado"
                    }
                },
                old: req.body,
                formType: "register"
            });
        }else{
            if(req.file){
                req.body.image = req.file.filename;
            }
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
            }).then(
                res.render('user/login', {
                    errors: {
                        registro:{
                            msg: "Te has registrado correctamente, ya puedes iniciar sesión"
                        }
                    },
                    formType: "login"
                })
            )
        }

    }
}

module.exports = users;