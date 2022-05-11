// function authMidle(req, res, next) {
//     if (!req.session.usuarioLogueado) {
//         return res.redirect('./login')
//     }
//     next();
// }

// module.exports = authMidle;

 function authMidle(req, res, next) {
     if (!req.session.usuarioLogueado) {
        return res.render('user/login', { 
            errors: {
                email:{
                    msg: "Debes loguearte para realizar esta acción"
                }
            },
            old: req.body,
            formType: "login"
        });   
    }
    next();
}

module.exports = authMidle;