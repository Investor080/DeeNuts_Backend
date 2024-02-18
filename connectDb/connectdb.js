require ("dotenv").config();
const mongoose = require("mongoose");
const ConnectionString = process.env.Connection_String

const connectDB = async()=>{
    await mongoose.connect(ConnectionString)
    return console.log("Db is connnected")
}

module.exports = connectDB
