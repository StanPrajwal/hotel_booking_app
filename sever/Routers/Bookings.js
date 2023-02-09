const routes = require('express').Router()
const {verifyToken,Book}= require('../Models/Booking')
const {isExisted} = require("../Models/User")

routes.get('/',async(req,res)=>{
    try {
        const allBooings = await Book.find()
        if(allBooings.length){
            return res.json({
                Bookings:allBooings
            })
        }
    } catch (error) {
        throw Error
    }
})
routes.get('/user/:id',async(req,res)=>{
    try {
        const token = await verifyToken(req.params.id)
        console.log(token)
        if(token){
            
            const bookings = await Book.find({user_id:token})
            if(bookings){
                return res.json({
                    bookings:bookings
                })
            }
            else{
                return res.json({
                    no:"No Bookings"
                })
            }
        }
        else{
            return res.status(403).json({
                error:"Unauthorized!"
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})
routes.post('/',async(req,res)=>{
    try {
        
        const {email,phone,full_name,number_of_guest,number_of_rooms,from,to,hotel_id,user_id,payment,total_price,price_per_day,hotel_name,hotel_address} = req.body.data
        
        const token = await verifyToken(user_id)
        if(token){
            const  user = await isExisted(token)
            if(user){
                // console.log(user)
                await Book.create({
                    email,
                    phone,
                    full_name,
                    number_of_guest,
                    number_of_rooms,
                    from,to,hotel_id,
                    user_id:user,
                    payment,
                    total_price,price_per_day,hotel_name,hotel_address
                })
                res.json({
                    greeting:"Thank You!",
                    message:"Your Booking Completed."
                })
            }
            
        }
        else{
            return res.status(403).json({
                error:"Unauthorized!"
            })
        }
        
       
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:"Try Again Aftter some time"
            
        })
    }
})
routes.delete("/user/:id",async(req,res)=>{
    try {
        
        const id = req.params.id.split("-")
        console.log(id)
        const token = await verifyToken(id[0])
        if(token){
            const  user = await isExisted(token)
            if(user){
            const deleteBook =    await Book.deleteOne({$and:[{user_id:token},{_id:id[1]}]})
            console.log(deleteBook)
            res.json({
                message:"Booking Canceled"
            })
            }
        }
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = routes


