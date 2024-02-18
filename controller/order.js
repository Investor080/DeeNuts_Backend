const Order = require ("../model/order")



// Create Order


const createOrder = async (req, res)=>{
    try {
        const newOrder = new Order(req.body)
        const savedOrder = await newOrder.save();
        res.status(200).json({savedOrder})
    } catch (error){
        console.log(error)
        res.status(500).json({error: "Server Error"})
    }
};


// Get User Orders


const getSingleOrder = async (req, res)=>{
    try {
        const orders = await Product.find({userId: req.params.userId})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
};



// Get All Orders

const getAllOrders = async (req, res)=>{
    try {
        const Orders = await Order.find();
        return res.status(200).json({Orders})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
};


// Update Order

const updateOrder = async (req, res)=>{
    try {
        const updateInfo = req.body
        const updatedOrder  = await Order.findByIdAndUpdate(
            req.params,
            updateInfo,
            {new: true, runValidator: true}
        ); 
        return res.status(200).json({updatedOrder})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
};


// Delete Carts

const deleteOrder = async (req, res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Order has beeen deleted"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }  
};

module.exports = {
    createOrder,
    getSingleOrder,
    getAllOrders,
    updateOrder,
    deleteOrder
}