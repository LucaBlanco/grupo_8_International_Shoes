const{write,list,all,find,create,generate,update,garbage, match}=require('../models/users');

const controller={
    index:(req,res)=>res.render('user/registro'),
    deposit:(req,res)=> {
        let userExist = match('email', req.body.email);
        console.log(userExist);
        if (userExist) {
            return res.render('user/registro', {
                errors: {
                    registro:{
                        msg: "Email ya registrado"
                    }
                }
            });
        }else{
            if(req.file){
                req.body.image=req.file.filename;
                const perfilNuevo=generate(req.body);
                create(perfilNuevo);
                return res.render('user/login', {
                    errors: {
                        email:{
                            msg: "Registro correcto, puedes loguearte"
                        }
                    }
                })
            }else{ 
                const perfilNuevo=generate(req.body);
                create(perfilNuevo);
                return res.render('user/login', {
                    errors: {
                        email:{
                            msg: "Registro correcto, puedes loguearte"
                        }
                    }
                });
            }
        }

    } 
}

module.exports=controller;