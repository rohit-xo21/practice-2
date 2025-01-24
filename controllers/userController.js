const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signup = async (req,res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({message: 'User added successfully'});
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if(!existingUser){
            return res.status(400).send('User does not exists');
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch){
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({id: existingUser._id, email: existingUser.email}, 
            'secret', {expiresIn: '1h'});    
        res.status(200).json({token});
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = { signup, login };