const express = require('express')
const wishlists = require('../model/wishlistModel')
const carts = require('../model/cartModel')


exports.addToWishlist = async (req, res) => {
    const { id, title, price, description, category, image, rating } = req.body   
    const  {userId}  = req.payload
    console.log("req ::::",req.payload);
      
    try {
        const existingProduct = await wishlists.findOne({ id:id, userId:userId })
        if (existingProduct) {
            res.status(406).json("product already exist in your wishlist")
            console.log("product already exist in your wishlist");           
        }
        else {         
            const newProduct = new wishlists({
                userId: userId,
                id: id,
                title: title,
                price: price,
                description: description,
                category: category,
                image: image,
                rating: rating,               
            })
            console.log(newProduct);
            
            await newProduct.save()
            res.status(200).json("product added to wishlist successfully")
        }
    }
    catch (error) {
        res.status(406).json(error)
    }
}

//get wishlist Items
exports.getWishlistItems = async(req,res)=>{
    console.log("inside get wishlist items 7777:::"); 
    const {userId} = req.payload
    console.log("user id",userId);   
    try{
    const wishlistItems = await wishlists.find({userId:userId});
    res.status(200).json(wishlistItems)
    }
    catch(error){
        res.status(406).json("error in getting items")
    }
}


//delete wishlist item
exports.deleteWishListItems = async(req,res)=>{
    const { id } = req.params;
    console.log("delete wishlists OOOO ::");  
    try{
        const deleteItem = await wishlists.findByIdAndDelete({_id:id})
        res.status(200).json("wishlist item deleted successfully")       
    }
    catch(error){
        res.status(406).json(error)
    }
}

