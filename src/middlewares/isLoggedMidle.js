const User = require('../models/users');

function isLoggedMidle(req, res, next) {
    res.locals.isLogged = false;


    let emailCookie = req.cookies.userEmail;
    let userFromCookie = User.match('email', emailCookie); 
    if (userFromCookie) {
        req.session.usuarioLogueado = userFromCookie;        
    }       

    console.log(`Vino del midle: ${req.cookies.userEmail}`);
    console.table(userFromCookie);

    if (req.session && req.session.usuarioLogueado) {
        res.locals.isLogged = true;
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
    }
    next();
}

module.exports = isLoggedMidle;