const express = require('express')
const users = require('../model/userModel')
const jwt = require('jsonwebtoken')


//user registration
exports.userRegistration = async(req,res)=>{
    console.log("insude user register controller");  
    console.log(req.body);
    
    const {username,email,password}= req.body
    
    try{    
        const existingUser = await users.findOne({email:email})
        if(existingUser){
            res.status(400).json("User already exist please login")
        }
        else{
            const newUser = new users({
                username:username,
                email:email,
                password:password
            })
            newUser.save()
            res.status(200).json("User Registered successfully")
        }
    }
    catch(error){
        res.status(400).json(error)
        
    }

}


//login

exports.userLogin = async(req,res)=>{
    console.log("inside login");
    
    const {email, password} = req.body;
    try{
        const existingUser = await users.findOne({email:email,password:password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.SECRET_KEY)
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(406).json("Invalid username or password")
        }
    }
    catch(error){
        res.status(406).json(error)
       
    }
}
