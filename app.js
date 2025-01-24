const express = require('express');
const { connect } = require('mongoose');
const connectDB = require('./config/db')
const app = express();
const middleware = require('./middleware/authMiddleware');

app.use(express.json());





const bookRoute = require('./routes/bookRoute');
const userRoute = require('./routes/userRoute');
app.use('/books',middleware, bookRoute);
app.use('/users', userRoute);


app.listen(3000, async () => {
    try {
        await connectDB();
        console.log("MongoDB is connected to the server")

    } catch(err){
        console.log(err)
    }

    console.log("Server is running on PORT 3000")
});