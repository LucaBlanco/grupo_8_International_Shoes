const users = {
    // login: (req, res) => res.sendFile(path.resolve(__dirname,'../views','login.ejs')),

    // registro: (req, res) => res.sendFile(path.resolve(__dirname,'../views','registro.ejs'))

    login: (req, res) => res.render('user/login'),

    registro: (req, res) => res.render('user/registro')
};


module.exports = users;

