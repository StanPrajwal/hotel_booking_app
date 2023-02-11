const routes = require('express').Router()
const Book = require('../Models/Booking')
const {verifyToken} = require("../BasicVerification")
const {isExisted} = require("../Models/User")
const Hotel = require("../Models/Hotel")
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
routes.get('/hotailer/:id',async(req,res)=>{
    try {
        
        const token = await verifyToken(req.params.id)
        console.log(token)
        if(token){
            const hotel = await Hotel.findOne({hotailer_id:token})
            console.log(hotel)
            if(hotel){
                const bookings = await Book.find({hotel_id:hotel._id})
                console.log(bookings)
                if(bookings.length){
                    return res.json({
                        bookings:bookings
                    })
                }
                else{
                    return res.json({
                        message:"No Bookings..."
                    })
                }
            }else{
                return res.json({
                    message:"You Didnot add any hotel rooms yet!"
                })
            }
        }
    } catch (error) {
        throw error
    }

})
routes.get('/user/:id',async(req,res)=>{
    // console.log(req.params.id)
    try {
        const token =  verifyToken(req.params.id)
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
        
        const {data} = req.body
        
        const token =  verifyToken(data.user_id)
        if(token){
            const  user = isExisted(token)
            if(user){
                // console.log(user)
                data.user_id = user
                await Book.create({data})
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
        // console.log(id)
        const token =  verifyToken(id[0])
        if(token){
            const  user = isExisted(token)
            if(user){
            const deleteBook = await Book.deleteOne({$and:[{user_id:token},{_id:id[1]}]})
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


