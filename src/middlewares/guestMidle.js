function guestMidle(req, res, next) {
    if (req.session.usuarioLogueado) {
        return res.redirect('./perfil')
    }
    next();
}

module.exports = guestMidle;