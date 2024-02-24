const Product = require ("../model/product");
const upload = require('../middleware/handleFile')
const path = require('path')


// Create Product

const createProduct = async (req, res)=>{
    try {
        const {title, price, product_description, quantity, categories} = req.body;
        const productImage = req.file.image;
        const existingProduct = await Product.findOne({tittle})
        if(existingProduct){
            return res.status(409).json({message: "Product Already Exist", success: false})
        }
        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({message: "Product image is required"})
        }
        const uploadPath = __dirname + '/uploads/' + productImage.name;
        const newProduct = await Product.create({
            title,
            price,
            product_description,
            quantity,
            categories,
            productImage: uploadPath
        });
        await Product.save();
        res.json({message: "Product Added Successfully", product: newProduct })
    } catch (error){
        console.log(error)
        res.status(500).json({error: "Server Error"})
    }
};


// Get Single Product


const getSingleProduct = async (req, res)=>{
    try {
        const {productId} = req.params
        const existingProduct = await Product.findById(productId)
        if(!existingProduct){
            return res.status(400).json({message: "Product Not Found", success: false})
        }
        res.json(productId)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
};



// Get All Products

const getAllProduct = async (req, res)=>{
    try {
        const products = await Product.find();
        return res.status(200).json({products})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
};


// Update Products

const updateProduct = async (req, res)=>{
    try {
        const {productId} = req.params
        const updateProd = req.body

        const updatedProduct  = await Product.findByIdAndUpdate(
            productId,
            updateProd,
            {new: true, runValidator: true}
        ); 
        if(!updatedProduct){
            return res.status(404).json({message: "Product Not Found", success: false})
        }
        return res.status(200).json({message: "Product Updated Succcessfully", success: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }
};


// Delete Products

const deleteProduct = async (req, res)=>{
    try {
        const {title} = req.body
        const deletedProduct = await Product.findByIdAndDelete(title)
        if(!deletedProduct){
            res.status(404).json({message: "Product Not Found"})
        }
        res.status(204).send();
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error"})
    }  
};



module.exports = {
    createProduct,
    getSingleProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
}
 