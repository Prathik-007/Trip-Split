//handles request, interacts with the database and sends a response
const User=require('../models/User.js');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

exports.registerUser= async(req,res) =>{
    try{
        const {name,email,pass}=req.body; //taking the input dat from registeruser 
        if(!name || !email || !pass){
            return res.status(400).json({message:'Please enter all fields'});
        }
        //check if user already exists
        const userCheck= await User.findOne({email}); //query the database
        if(userCheck){
            return req.status(400).json({message: 'User already exists'});
        }
        const encypt= await bcrypt.genSalt(10);
        const encryptPassword= await bcrypt.hash(pass,encypt); //hashing the password
    
        //create the new user
        const user=await User.create({
            name,email,password: encryptPassword,
        });
        //sending response if created sucessfully
        if(user){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id),
            });
        }else{
             res.status(400).json({ message: 'Invalid user data' });
        }
    }catch(error){
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

//function to generate JWT Token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWt_SECRET,{
        expiresIn:'30d',
    });
};
