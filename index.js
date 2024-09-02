import express from 'express';
import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import session from 'express-session'
import {auth} from './src/middlewares/auth.middleware.js';


const server = express();
server.use(express.static('public'));
server.use(session({
 secret:'Secretkey',
 resave: false,
 saveUninitialized: true,
 cookie: { secure: false }  // change this to true in production environment to enable HTTPS secure cookies.
}));


// server.use(express.static('src/views'));

// Create an instance of ProductController
const productController = new ProductController();
const usersController = new UserController();


// setup view engine settingsnode 
server.use( ejsLayouts);
server.use(express.json());
server.set('view engine', 'ejs');
server.set("views", path.join(path.resolve(),"src", "views"));
//parse form data
server.use(express.urlencoded({extended:true}));  

server.get('/', auth, productController.getProducts);
server.get('/register', usersController.getRegister);
server.get('/login', usersController.getLogin);
server.post('/login', usersController.postLogin);
server.get('/login', usersController.logout);

server.post('/register', usersController.postRegister);

server.get('/add-product', auth,productController.getAddProduct);
server.get("/update-product/:id" ,auth, productController.getUpdateProductView);
server.post('/delete-product/:id',auth, productController.deleteProduct);
server.post('/',uploadFile.single('imageUrl'),
  validationMiddleware,   
  productController.postAddProduct);

server.get("/update-product",auth, productController.postUpdateProduct)



server.listen(3400 ,()=>{
  console.log('Server is running on port 3400');
 
});





