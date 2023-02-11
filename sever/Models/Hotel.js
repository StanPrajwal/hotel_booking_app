const mongoose = require("mongoose")


const hotelSchema = mongoose.Schema({
    hotel_name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    hotel_type:{ 
        type:String,
        required:true
    },
    price_per_night:{ 
        type:Number,
        required:true
    },
    image_url:{
        type:[String],
        required:true
    },
    max_count:{
        type:Number,
        required:true
    },
   available_rooms:{
        type:Number,
        required:true
    },
    collections:[],
    facililies:[],
    hotailer_id:{
        type:mongoose.Types.ObjectId,
        ref:"Owner",
        required:true
    }

})

const Hotel = mongoose.model('Hotel',hotelSchema)


module.exports = Hotel