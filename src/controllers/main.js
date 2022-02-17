const {list,all,filter,match} = require('../models/main') 
const controller = {
    index: (req, res) => res.render('home')
}
   /*  search: (req,res)=>{
        /*si el formulario DE INDEX.EJS va por get la informacion al controlador le llega EN QUERY.
 const{search} el search es por el search que puso en name="search" del formulario de index.ejs.
 La ruta  /productos, puede venir con informacion o sin informacion(desde el nav /productos/), si viene del 
 formulario de search (busqueda)lo hace con informacion a traves de GET y al controllador le llega en query
        const{search}=req.query //con el query busco datos de la url//
        return search ? res.render('product/listado',{title: 'Search | '+ search ,productos:filter('name',search) 
    }) : res.render('product/listado',{title: 'Product List',productos:all()})
    } Si viene algo por la busqueda(search) voy a mostrar en el title search + el termino que busco y voy a mostrar lo 
    que busco con el filtro que definimos . (:) De lo contrario, sino viene nada por el search, le digo que me muestre la l
    ista entera, todos los productos que tienen stock, con el uso del all() 
} */

module.exports = controller