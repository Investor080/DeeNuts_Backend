const Cart = require ("../model/cart")


// Create Cart

const createCart = async (req, res)=>{
    try {
        const newCart = new Cart(req.body)
        const savedCart = await newCart.save();
        res.status(200).json({savedCart})
    } catch (error){
        console.log(error)
        res.status(500).json({error: "Server Error"})
    }
};


// Get User Cart

const getSingleCart = async (req, res)=>{
    try {
        const cart = await Product.findOne({userId: req.params.userId})
        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
};



// Get All Carts

const getAllCart = async (req, res)=>{
    try {
        const Carts = await Cart.find();
        return res.status(200).json({Carts})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
};


// Update Cart

const updateCart = async (req, res)=>{
    try {
        const updateInfo = req.body

        const updatedCart  = await Cart.findByIdAndUpdate(
            req.params,
            updateInfo,
            {new: true, runValidator: true}
        ); 
        return res.status(200).json({updatedCart})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
};


// Delete Carts

const deleteCart = async (req, res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Cart has beeen deleted"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }  
};


module.exports = {
    createCart,
    getSingleCart,
    getAllCart,
    updateCart,
    deleteCart
}
