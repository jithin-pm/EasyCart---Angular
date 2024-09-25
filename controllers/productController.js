const express = require('express')
const products = require('../model/productModel')


exports.getAllProducts = async (req, res)=> {
    try{
        const allProducts = await products.find()
        res.status(200).json(allProducts)
    }
    catch(error){
        res.status(406).json(error)
    }

}

//view product by id
exports.getProductDeailsById = async(req,res)=>{
    console.log("inside product details");    
    const {id} = req.params;
    console.log("id",id);  
    try{           
        const productDetails = await products.findOne({_id:id});
        console.log("product Details :",productDetails);       
        res.status(200).json(productDetails)
    }
    catch(error){
        res.status(406).json(error)
    }
}
