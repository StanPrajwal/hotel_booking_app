const routes = require("express").Router()
const {Owner,createOwner,verifyOwner} = require("../Models/Hotailer")

routes.get('/',async(req,res)=>{
    const owners = await Owner.find()
    res.json({
        owners
    })
})
routes.post("/",async(req,res)=>{
    try {
        const owner = await createOwner(req.body.data)
        if(owner){
            res.json({
                greeting:"Thank You!",
                message:"Becoming A Part Of Us"
            })
        }

    } catch (error) {
        if(error.code === 11000){
            return res.status(403).json({
                error:"User Already Existed!"
            })
         }
        throw error
    }
})
routes.post("/login",async(req,res)=>{
    try {
        const {EmailOrPhone,Password} = req.body.data
        const token = await verifyOwner(EmailOrPhone,Password)
        if(token){
            res.json({
                token:token
            })
        }
        else{
            res.status(403).json({
                error:"Unauthorized user!"
            })
        }
    } catch (error) {
        res.status(500).json({
           error:"Page not Found" 
        })
        throw error
    }
})

module.exports = routes