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
    facililies:[],
    hotailer:{
        type:mongoose.Types.ObjectId,
        ref:"Owner"
    }

})

const Hotel = mongoose.model('Hotel',hotelSchema)

const isHotels = async ()=>{
    try {
        const hotels = await Hotel.find()
        return hotels
    } catch (error) {
        return false
    }
}



module.exports = { Hotel,isHotels}