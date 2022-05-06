const session = require('express-session');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const controller = require('./products');

let fields =  ['id', 'firstName','lastName', 'email','userName', 'birthDate','country', 'province','city', 'address', 'image'];

const api = {   
    //users

    listUsers: async (req, res) => {
        //let { offset, limit } = req.query ? req.query : {offset : "1", limit : "10"};
        let offset = req.query.offset ? req.query.offset :"1";
        let limit =  req.query.limit ? req.query.limit : "10";

        let {count, rows } = await db.Users.findAndCountAll({
            attributes: fields,
            offset: parseInt(offset), limit: parseInt(limit)
        });
        res.json({ count, users : rows })
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
        let {count, rows} = await db.Products.findAndCountAll();
        res.json({ count, products : rows })
    },
    detailsProducts: (req, res) => {
        db.Products.findByPk(req.params.id)
            .then(function(producto){
                res.json({producto})
            })
    }
}

module.exports = api;