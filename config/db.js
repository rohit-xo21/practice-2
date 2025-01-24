const mongoose = require("mongoose");
const dotenv = require('dotenv');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch(err){
        console.log("Error:", err.message);
    }
}

module.exports = connectDB;