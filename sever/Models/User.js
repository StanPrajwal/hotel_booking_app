const mongoose = require("mongoose")
const {createEncryptPassword,decryptPassword,generateJWT} = require('../BasicVerification')
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
    const hash = createEncryptPassword(data.Password)
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
            const password = decryptPassword(Password, user.Password)
            if (password) {
                const token = generateJWT(user._id)
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