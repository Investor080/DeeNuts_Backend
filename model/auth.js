const mongoose = require ("mongoose");
const {Schema, model} = mongoose;
const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},
      {timestamps:true}
);