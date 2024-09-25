const express = require('express')
const carts = require('../model/cartModel')


exports.addToCart = async (req, res) => {
    const { id, title, quantity, price, description, category, image, rating } = req.body
    const userId = req.payload
    try {
        const existingProduct = await carts.findOne({ id: id, userId: userId })
        if (existingProduct) {
            existingProduct.quantity = existingProduct.quantity + 1;
            existingProduct.grandTotal = existingProduct.quantity * existingProduct.price;
            res.status(200).json("item added to cart")
            existingProduct.save();
        }
        else {
            const newProduct = new carts({
                userId,
                id,
                title,
                price,
                description,
                category,
                image,
                rating,
                quantity,
                grandTotal: price,
            })
            await newProduct.save()
            res.status(200).json("product added to cart successfully")
        }
    }
    catch (error) {
        res.status(406).json(error)
    }
}


//get cart item
exports.getCartItems = async (req, res) => {
    console.log("inside get cart controller");
    const userId = req.payload
    console.log("id:::::", userId);

    try {
        const wishlistIems = await carts.find({ userId: userId })
        res.status(200).json(wishlistIems)
    }
    catch (error) {
        res.status(406).json(error)
    }
}

//delete cart item
exports.deleteCartItems = async (req, res) => {
    const { id } = req.params;
    console.log("delete cart OOOO ::");
    try {
        const deleteCartItem = await carts.findByIdAndDelete({ _id: id })
        res.status(200).json("cart item deleted successfully")
    }
    catch (error) {
        res.status(406).json(error)
    }
}


//for increamenting cart item
exports.increamentItem = async (req, res) => {
    console.log("iside increament item");
    const { id } = req.params;


    try {
        const selectedItem = await carts.findOne({ _id: id });
        if (selectedItem) {
            selectedItem.quantity += 1;
            selectedItem.grandTotal = selectedItem.price * selectedItem.quantity
            selectedItem.save()
            res.status(200).json(selectedItem)
        }

    }
    catch (error) {
        res.status(401).json("error in increasing item")
    }

}

//for decreamenting cart item

exports.decreamentItem = async (req, res) => {
    const { id } = req.params;
    try {
        const selectedItem = await carts.findOne({ _id: id })
        if (selectedItem) {
            selectedItem.quantity -= 1;
            if (selectedItem.quantity == 0) {
                await carts.deleteOne({ _id: id })
                res.status(200).json("item removed from cart")
            }
            else {
                selectedItem.grandTotal = selectedItem.quantity * selectedItem.price;
                selectedItem.save()
                res.status(200).json("selected item decremented successfully")
            }
        }

    }
    catch {
        res.status(401).json("error in decreasing item")
    }
}

exports.emptyCart = async (req, res) => {
    const userId = req.payload
    try {
        await carts.deleteMany({ userId: userId })
        res.status(200).json("cart item deleted successfully")
    }
    catch (error) {
        res.status(401).json(error)
    }
}