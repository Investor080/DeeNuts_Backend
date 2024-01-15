require ("dotenv").config();
const mongooose = require = ("mongoose");
// const ConnectionString = 

const connectDB = async()=>{
    await mongooose.connect(ConnectionString)
    return console.log("Db is connnected")
}

module.export = connectDB
