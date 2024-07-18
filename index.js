import express from 'express';
import ProductController from "./src/controllers/product.controller.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import validationMiddleware from './src/middlewares/validation.middleware.js';

const server = express();
server.use(express.static('public'));


// server.use(express.static('src/views'));

// Create an instance of ProductController
const productController = new ProductController();


// setup view engine settings
server.use( ejsLayouts);
server.use(express.json());
server.set('view engine', 'ejs');
server.set("views", path.join(path.resolve(),"src", "views"));
//parse form data
server.use(express.urlencoded({extended:true}));  

server.get('/', productController.getProducts);

server.get('/add-product', productController.getAddProduct);

server.get("/update-product/:id" , productController.getUpdateProductView);

server.post('/delete-product/:id', productController.deleteProduct);

server.post('/', validationMiddleware,productController.postAddProduct);

server.get("/update-product", productController.postUpdateProduct)



server.listen(3400 ,()=>{
  console.log('Server is running on port 3400');
 
});





