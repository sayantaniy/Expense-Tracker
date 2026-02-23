const transactionModel = require('../models/transaction.model')
const jwt = require('jsonwebtoken')

function getId(req){
    //check if user has token

    const token = req.cookies.token;

   if (!token){
    return null
   }

   const decoded = jwt.verify(token,process.env.JWT_SECRET)
   return decoded.id


}

async function createTransaction(req,res){
    try{
        const userId = getId(req)
        if (!userId){
            return res.status(403).json({
                message:"Unauthorized Access"
            })
        }
        const {amount,category,description,date} = req.body

        const transaction = await transactionModel.create({
            userId,
            amount,
            category,
            description,
            date
        })

        res.status(201).json({
            message:"Transaction Created Successfully",
            transaction
        })

    }catch(err){
        console.error(err)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

module.exports = {
    createTransaction
}