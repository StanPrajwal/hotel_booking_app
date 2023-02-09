const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
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

    const hash = await bcrypt.hash(data.Password, 10)
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
        if (owner) {

            const password = await bcrypt.compare(Password, owner.Password)
            if (password) {
                const token = await jwt.sign({ id: owner._id }, process.env.jwtKey)
                return token
            }

        }
        else {
            // console.log(owner)
            return false
        }
    } catch (error) {
        return error.message
    }


}

module.exports = { Owner, isExisted, createOwner, verifyOwner }