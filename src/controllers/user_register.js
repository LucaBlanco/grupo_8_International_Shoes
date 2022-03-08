const{write,list,all,find,create,generate,update,garbage}=require('../models/users');

const controller={
    index:(req,res)=>res.render('user/registro'),
   /*  create:(req,res)=>{ const perfilNuevo=generate(req.body);
         res.send('users/registro/'+perfilNuevo.id, { title:'Crear'})}, */
     deposit:(req,res)=> {
        if(req.file){
            let img=req.body;
            img.image=req.file.filename;
            const perfilNuevo=generate(req.body);
            create(perfilNuevo);
            return res.redirect('/users/'+perfilNuevo.id)
        }else{ 
            console.log(req.body.first_name);
            const perfilNuevo=generate(req.body);
            create(perfilNuevo);
            return res.redirect('/users/'+perfilNuevo.id);
        } 
    } 
}

module.exports=controller;