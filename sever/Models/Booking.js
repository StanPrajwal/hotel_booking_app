const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
require("dotenv").config()
const bookingSchema = mongoose.Schema({
    full_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    number_of_guest:{
        type:String,
        required:true,
    },
    number_of_rooms:{
        type:String,
        required:true,
    },
    total_price:{ 
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    hotel_id:{
        type:mongoose.Types.ObjectId,
        ref:"Hotel",
        required:true
    },
    cancel_order:{
        type:Boolean,
        default:false
    },
    hotel_name:{
        type:String,
        required:true
    },
    hotel_address:{
        type:String,
        required:true
    },
    price_per_day:{
        type:String,
        required:true
    }

})

const Book = mongoose.model('Book',bookingSchema)
module.exports = Book