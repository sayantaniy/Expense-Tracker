const jwt = require('jsonwebtoken')

function checkToken(req,res,next){
    const token = req.cookies.token
    if (!token){
        res.status(403).json({
            message:"Unauthorized Access"
        })
    }else{
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decoded
            next()
        }catch(err){
            res.status(403).json({
                message:"Invalid Token"
            })
        }
    }
}

module.exports = checkToken