const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = mongoose.Schema({
    Firstname:{
        type:String,
        required:true
    },
    Lastname:{
        type:String,
        required:true
    },

    Email:{
        type:String,
        required:true,
        unique:true
    },
    Phone:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
    }
})
const User = mongoose.model('User',userSchema)

const isExisted = async (id) => {
        const user = await User.findById({_id:id})
        if(user){
            return user._id
        }
        else{
            return false
        }
}

const createUser = async (data) => {
    console.log(data)
    const hash = await bcrypt.hash(data.Password, 10)
    const user = await User.create({
        Firstname: data.Firstname,
        Lastname: data.Lastname,
        Password: hash,
        Email: data.Email,
        Phone: data.Phone
    })
    return user
}
const verifyUser = async (EmailOrPhone, Password) => {
    const Email = EmailOrPhone
    const Phone = EmailOrPhone
   
    try {
        const user = await User.findOne({ $or: [{ Email }, { Phone }] })
       
        if (user) {
            // console.log(user)
            const password = await bcrypt.compare(Password, user.Password)
            if (password) {
                const token = await jwt.sign({ id: user._id }, process.env.jwtKey)
                return token
            }

        }
        else {
            // console.log("false")
            return false
        }
    } catch (error) {
        // console.log(error)
        return error.message
    }


}



module.exports = {User,isExisted,verifyUser,createUser}