const mongoose = require ("mongoose");
const {Schema, model} = mongoose;
const productSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    productImage:{
        type: String,
        required: true
    },
    product_description:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    categories:{
        type: Array,
    },
    status:{
        enum: ["pending", "approved", "disapproved"],
        default: "pending",
        required: true
    }
})