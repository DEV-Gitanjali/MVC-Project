import path from 'path';
import ProductModel from '../models/product.model.js';

export default class ProductController{
    
    getProducts(req,res){
        let products = ProductModel.get();
        console.log(products)
        res.render('index', { products , userEmail:req.session.userEmail});

        // console.log(path.resolve());
        // return res.sendFile(path.join(path.resolve(),'src','views','products.html' ),)
    }



    // getAddForm(req , res){
    //     return  res.render('new-product');
    // }

    // addNewProduct(req, res){
    //     // acess data from form
    //     console.log(req.body);
    //     ProductModel.add(req. body);
    //     let products = ProductModel.get();
    //     return res.render('products' , {products})

        
    // }


    getAddProduct(req, res , next){
        res.render('new-product',{
            errorMessage:null,
        })
    }

    postAddProduct(req, res , next){  
        ProductModel.add(req.body);
        res.render('index' , { products , userEmail:req.session.userEmail})
    }

    getUpdateProductView(req, res, next){
        // 1. if product exists then return view
           const id =req.params.id;
           const productFound = ProductModel.getById(id);

           if(productFound){
            res.render('update-product', {
                product: productFound,
                errorMessage: null,
             userEmail:req.session.userEmail
            });
           }
        // 2.else return errors
        else {

            res.status(401).send('product not found');
        }
    }

    postUpdateProduct(req , res){

        ProductModel.update(req.body);
        var products = ProductModel.getAll();
        res.render('index' ,{products})
    }
    
    deleteProduct(req , res){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);

           if(productFound){    
           return  res.status(401).send('product not found');
           }

        ProductModel.delete(id);
        var products = ProductModel.getAll();
        res.render('index' ,{products , userEmail:req.session.userEmail})
    }
    }





