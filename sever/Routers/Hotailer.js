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
        // const {Email,Phone} = req.body
        // const hotailer = await isExisted(Email,Phone)
       
        // if(hotailer){
        //    return res.status(403).json({
        //     message:"User Already Existed"
        //    })
        // }
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
        throw Error
    }
})
routes.post("/login",async(req,res)=>{
    try {
        const {EmailOrPhone,Password} = req.body.data
        const token = await verifyOwner(EmailOrPhone,Password)
        
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