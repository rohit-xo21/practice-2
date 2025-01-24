const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://orimforai:Qwertyui12345678@cluster0.2pwu0.mongodb.net/practice-2');
        console.log('MongoDB connected successfully');
    } catch(err){
        console.log("Error:", err.message);
    }
}

module.exports = connectDB;