const mongoose = require("mongoose")
const {createEncryptPassword,decryptPassword,generateJWT} = require('../BasicVerification')

require("dotenv").config()
const HotailerSchema = mongoose.Schema({
    Firstname: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true,
        unique: true
    },
    Phone: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
    },
    owner:{
        type:Boolean,
        default:false
    }
})

const Owner = mongoose.model('Owner', HotailerSchema)

const isExisted = async (Email, Phone) => {
    const owner = await Owner.findOne({ $or: [{ Email }, { Phone }] })
    return owner
}

const createOwner = async (data) => {

    const hash = createEncryptPassword(data.Password)
    const owner = await Owner.create({
        Firstname: data.Firstname,
        Lastname: data.Lastname,
        Password: hash,
        Email: data.Email,
        Phone: data.Phone
    })
    return owner
}
const verifyOwner = async (EmailorPhone, Password) => {
    const Email = EmailorPhone
    const Phone = EmailorPhone
    try {
        const owner = await Owner.findOne({ $or: [{ Email }, { Phone }] })

        console.log(owner,"details")
        if (owner) {

            const password = await decryptPassword(Password, owner.Password)
            console.log(password,"password")
            if (password) {
                const token = await generateJWT(owner._id)
                console.log(token,"get")
                return token
            }

        }
        else {
            // console.log(owner)
            return false
        }
    } catch (error) {
        throw error
    }


}

module.exports = { Owner, isExisted, createOwner, verifyOwner }