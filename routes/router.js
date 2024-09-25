const express = require('express')
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')
const router= new express.Router()
const wishlistController = require('../controllers/wishlistController')
const cartController = require('../controllers/cartController')
const jwtMiddleware  = require('../middlewares/jwtMiddlewares')

//get all product
router.get('/get-allProducts',productController.getAllProducts)

//user registration
router.post('/registration',userController.userRegistration)

//user login
router.post('/login',userController.userLogin)

//getProduct details by id
router.get('/get-productDetails/:id',productController.getProductDeailsById)

//add to wishlist
router.post('/addToWishlists',jwtMiddleware,wishlistController.addToWishlist)

//to get wishlist items
router.get('/getWishlistItems',jwtMiddleware,wishlistController.getWishlistItems)

//add to cart
router.post('/addToCart',jwtMiddleware,cartController.addToCart)

//get cart items
router.get('/getCartItems',jwtMiddleware,cartController.getCartItems)

//delete wishlist item
router.delete('/deleteWishlistItems/:id',jwtMiddleware,wishlistController.deleteWishListItems)

//delete cart ittem
router.delete('/deleteCartItem/:id',jwtMiddleware,cartController.deleteCartItems)

//increament cart item
router.get('/cart/increament/:id',jwtMiddleware,cartController.increamentItem)

//decreament cart item
router.get('/cart/decreament/:id',jwtMiddleware,cartController.decreamentItem)

router.delete('/cart/deleteCartItems',jwtMiddleware,cartController.emptyCart)

module.exports = router