const express = require('express');
const { signup, login } = require('../controller/auth');
const { createProduct, getSingleProduct, getAllProduct, updateProduct, deleteProduct } = require('../controller/product');
const { isLoggedin, isAdmin } = require('../middleware/auth');
const { createCart, getSingleCart, getAllCart, deleteCart, updateCart } = require('../controller/cart');
const { createOrder, getSingleOrder, getAllOrders, updateOrder, deleteOrder } = require('../controller/order');




const router = express.Router();

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/create-product').post([ isLoggedin, isAdmin ], createProduct)
router.route('/getproduct/:id').get([ isLoggedin ], getSingleProduct)
router.route('/getall-products').get([ isLoggedin ], getAllProduct)
router.route('/update-product/:id').patch([ isLoggedin, isAdmin ], updateProduct)
router.route('/deleteproduct/:id').delete([ isLoggedin, isAdmin ], deleteProduct)
router.route('/create-cart').post([ isLoggedin ], createCart)
router.route('/getcart/:userId').get([ isLoggedin ], getSingleCart)
router.route('/getall-carts').get([ isLoggedin, isAdmin ], getAllCart)
router.route('/update-cart').patch([ isLoggedin ], updateCart)
router.route('/deletecart/:id').delete([ isLoggedin ], deleteCart)
router.route('/create-order').post([ isLoggedin ], createOrder)
router.route('/getorder/:userId').get([ isLoggedin ], getSingleOrder)
router.route('/getall-orders').get([ isLoggedin, isAdmin ], getAllOrders)
router.route('/update-orders/:id').patch([ isLoggedin, isAdmin ], updateOrder)
router.route('/deleteorder/:id').delete([ isLoggedin, isAdmin ], deleteOrder)

module.exports = router