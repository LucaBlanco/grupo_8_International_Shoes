const session = require('express-session');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const controller = require('./products');

let fields =  ['id', 'firstName','lastName', 'email','userName', 'birthDate','country', 'province','city', 'address', 'image'];
const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};
const getPagingData = (count, page, limit) => {
    const totalPages = Math.ceil(count / limit);
    page = Number(page);
    const currentPage = page ? +page : 0;
    const prevPage = page ? page - 1 : -1;
    const nextPage = page<totalPages ? page + 1 : page - 1;    
    return { totalPages, currentPage, nextPage, prevPage };
};

const api = {   
    //users
    listUsers: async (req, res) => {
        const page = req.query.page ? req.query.page :"0";
        const size =  req.query.size ? req.query.size : "10";
        const { limit, offset } = getPagination(page, size);
        let {count, rows } = await db.Users.findAndCountAll({
            attributes: fields,
            offset: parseInt(offset), limit: parseInt(limit)
        });
        const { totalPages, currentPage, nextPage, prevPage } = getPagingData(count, page, limit) ;
        res.json({ count, users : rows, totalPages, currentPage, nextPage, prevPage })
    },
    detailsUsers: async (req,res)=> {
        let user;
        try {
            user = await db.Users.findOne({ 
                attributes: fields,
                where: { email: req.params.id } 
            })
        }catch (error) {
            console.error('Error:', error);
        }
        if(user){
            res.json({user})
        }else{
            res.json({exist:"no"})
        }
    }, 

    //products
    listProducts: async (req, res) => {
        const page = req.query.page ? req.query.page :"0";
        const size =  req.query.size ? req.query.size : "10";
        const { limit, offset } = getPagination(page, size);
        let {count, rows} = await db.Products.findAndCountAll({
            offset: parseInt(offset), limit: parseInt(limit)
        });
        const { totalPages, currentPage, nextPage, prevPage } = getPagingData(count, page, limit) ;
        res.json({ count, products : rows, totalPages, currentPage, nextPage, prevPage })
    },
    detailsProducts: (req, res) => {
        db.Products.findByPk(req.params.id)
            .then(function(producto){
                res.json({producto})
            })
    }
}

module.exports = api;