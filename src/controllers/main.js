const {list,all,filter,match} = require('../models/main') 
const controller = {
    index: (req, res) => res.render('home')
}

module.exports = controller