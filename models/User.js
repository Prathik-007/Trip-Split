//defining the schema structure for users

const mongoose=require('mongoose'); //Importing mongoose library

const userSchema= new mongoose.Schema(
    {   //username details
        name:{
            type:String,
            required:true,
        },
        //email unique needed
        email:{
            type:String,
            required:true,
            unique:true,
        },
        //password 
        password:{
            type:String,
            required:true,
        },
    },
    {
        timestamps:true, //automatically add time details
    }
);

//creating the user model from the schema
const User= mongoose.model('User',userSchema);

//exporting the model so that it can be used in other files
module.exports=User;
