const mongooose = require("mongoose");
const {Schema, model} = mongooose;
const cartSchema = new Schema({
    userId:{
        type: String,
        required: true
    }, 
    products:[
        {
            productId:{
                type: String
            },
            quantity:{
                type: Number,
                default: 1
            },
        },
    ],
},  {timestamps:true}
);

const cartModel = model("cart", cartSchema)
module.exports = cartModel