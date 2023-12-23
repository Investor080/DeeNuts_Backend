const mongooose = require("mongoose");
const {Schema, model} = mongooose;
const orderSchema = new Schema({
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
    amount:{
        type: Number,
        required: true
    },
    address:{
        type: Object,
        required: true,
    },
    status:{
        type: String,
        default: "pending"
    }
},  {timestamps:true}
);

const orderModel = model("order", orderSchema)
module.exports = orderModel