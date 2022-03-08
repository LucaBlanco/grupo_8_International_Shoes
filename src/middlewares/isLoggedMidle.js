const User = require('../models/users');

function isLoggedMidle(req, res, next) {
    res.locals.isLogged = false;

/*
    let emailCookie = req.cookies.userEmail;
    let userFromCookie = User.match('email', emailCookie);        
    req.session.usuarioLogueado = userFromCookie;
*/
    console.log(`Vino del midle: ${req.cookies}`);

    if (req.session && req.session.usuarioLogueado) {
        res.locals.isLogged = true;
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
    }
    next();
}

module.exports = isLoggedMidle;