const express=require('express');
const router=express.Router();
const { registerUser }=require('../controllers/authController');

router.post('/register',registerUser);
//"If you receive a POST request at the path /register, then you must execute the registerUser function

module.export =router;
