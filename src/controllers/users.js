const users = {
    // login: (req, res) => res.sendFile(path.resolve(__dirname,'../views','login.ejs')),

    // registro: (req, res) => res.sendFile(path.resolve(__dirname,'../views','registro.ejs'))

    login: (req, res) => res.render('login'),

    registro: (req, res) => res.render('registro')
};


module.exports = users;

