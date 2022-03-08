const{write,list,all,find,create,generate,update,garbage}=require('../models/users');

const controller={
    index:(req,res)=>res.render('user/registro'),
    deposit:(req,res)=> {
        if(req.file){
            let img=req.body;
            img.image=req.file.filename;
            const perfilNuevo=generate(req.body);
            create(perfilNuevo);
            return res.redirect('/users/'+perfilNuevo.id)
        }else{
            const perfilNuevo=generate(req.body);            
            create(perfilNuevo);
            return res.redirect('/users/'+perfilNuevo.id);
        }
    }
}

module.exports=controller;