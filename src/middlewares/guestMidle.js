function guestMidle(req, res, next) {
    if (req.session.usuarioLogueado && req.session.usuarioLogueado != undefined) {
        return res.redirect('./perfil')
    }
    next();
}

module.exports = guestMidle;