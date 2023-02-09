const routes = require("express").Router()
const {User,verifyUser,createUser} = require("../Models/User")

routes.get('/',async(req,res)=>{
    const users = await User.find()
    res.json({
        users
    })
})
routes.post("/",async(req,res)=>{
    try {
        
        const user = await createUser(req.body.data)
        if(user){
            res.json({
                greeting:"Thank You!",
                message:"Your Registration Completed."
            })
        }

    } catch (error) {
        if(error.code === 11000){
           return res.status(403).json({
                error:"User Already Existed!"
            })
        }
        throw Error
        
    }
})
routes.post("/login",async(req,res)=>{
    try {
        
        const {EmailOrPhone,Password} = req.body.data
        
        const token = await verifyUser(EmailOrPhone,Password)
        
        if(token){
           
           return  res.json({
                token:token
            })
        }
        else{
            return res.status(403).json({
                error:"Invalid Creadential"
            })
        }
    } catch (error) {
        throw Error
    }
})

module.exports = routes