const db = require('../database/models');
const itemCart = [];

const carrito = {
    listItem: async (req, res) => { 
        if (req.cookies.itemCart) {
            let cokkiecart = req.cookies.itemCart;
            console.log(cokkiecart);
            res.render('product/carrito', {producto: JSON.parse(cokkiecart)});
        } else{
            res.render('error', {error:"Tu carrito esta vacio"})
        }
    },
    addItem: async (req, res) => {
        let productToCart;
        try{
            productToCart = await db.Products.findByPk(req.params.id)
        }catch (error) {
            res.render('error', {error:error})
        }
        if(productToCart){
            console.log("Cokie itemCart : "+req.cookies.itemCart);
            if (req.cookies.itemCart) {
                let cokkiecart = req.cookies.itemCart;
                cokkiecart = JSON.parse(cokkiecart);
                console.log("el itemCart esta seteado");   
                console.log(cokkiecart);
            }  
            let cant = {cantidad: 1};
            const finalResult = Object.assign(productToCart.dataValues, cant);
            console.log(finalResult);
            itemCart.push(finalResult);
            res.cookie('itemCart', JSON.stringify(itemCart), {maxAge: (1000 *60) * 5})                        
            res.render('product/carrito', {producto:itemCart});

        }else{
            res.render('error', {error:"No se encontró el producto"})
        }
    },
    deleteItem: (req, res) => {

    },
    getCart: (req, res) => {

    }

}

module.exports = carrito;