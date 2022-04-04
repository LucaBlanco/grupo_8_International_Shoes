const db = require('../database/models');

async function isLoggedMidle(req, res, next) {
    res.locals.isLogged = false;
    let userFromCookie;
    let emailCookie = req.cookies.userEmail;
    if (emailCookie) {
        try {
            userFromCookie = await db.Users.findOne({ where: { email: emailCookie } })
        }catch (error) {
            console.error('Error:', error);
        }   
    }    
    if (userFromCookie) {
        req.session.usuarioLogueado = userFromCookie;        
    }       

    if (req.session && req.session.usuarioLogueado) {
        res.locals.isLogged = true;
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
    }
    next();
}

module.exports = isLoggedMidle;