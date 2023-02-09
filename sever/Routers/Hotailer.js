const routes = require("express").Router()
const {Owner,isExisted,createOwner,verifyOwner} = require("../Models/Hotailer")

routes.get('/',async(req,res)=>{
    const owners = await Owner.find()
    res.json({
        owners
    })
})
routes.post("/",async(req,res)=>{
    try {
        const {Email,Phone} = req.body
        const hotailer = await isExisted(Email,Phone)
       
        if(hotailer){
           return res.status(403).json({
            message:"User Already Existed"
           })
        }
        else{
            const owner = await createOwner(req.body)
            if(owner){
                res.json({
                    greeting:"Thank You!",
                    message:"Becoming A Part Of Us"
                })
            }

        }  
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
})
routes.post("/login",async(req,res)=>{
    try {
        const {EmailorPhone,Password} = req.body
        const token = await verifyOwner(EmailorPhone,Password)
        
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