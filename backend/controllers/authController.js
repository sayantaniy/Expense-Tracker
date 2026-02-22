const userModel = require('../models/auth.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registerUser(req,res){

    const {name,username,email,password}=req.body

    const userExists = await userModel.findOne({
        $or: [{username},{email}]
    })

    if(userExists){
        return res.status(409).json({
            message:"User Already Exists"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        name,
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message:"User created succesfully",
        user:{
            id:user.id,
            name:user.name,
            username:user.username,
            email:user.email
        }
    })

}

async function loginUser(req,res){

    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or:[{username},{email}]
    })

    if (!user){
        return res.status(404).json({
            message: "You need to register first"
        })
    }

    const checkPassword = await bcrypt.compare(password,user.password)

    if (!checkPassword){
        return res.status(409).json({
            message:"Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie('token', token)

    res.status(201).json({
        message:"Logged in Succesfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            name:user.name
        }
    })
}

async function logoutUser(req,res){

    res.clearCookie('token')

    res.status(200).json({
        message:"Logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}
