const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const createEncryptPassword = async (password) => {
    try {
      return await bcrypt.hash(password, 10)
    } catch (error) {
        console.log(error.message)
        throw error
    }
  
  
}
const decryptPassword =  async(password, stored_password) => {
    try {
        return await bcrypt.compare(password, stored_password)
    } catch (error) {
        console.log(error.message)
        throw error
    }
   
}
const generateJWT = async(data) => {
    try {
        return await jwt.sign({ id: data }, process.env.jwtKey)
    } catch (error) {
        console.log(error.message)
        throw error
    }
    
}
const verifyToken = async (data) => {
    try {
        console.log(data,"before")
        const token = await jwt.verify(data, process.env.jwtKey)
        console.log(token,"before")
        return token.id
    } catch (error) {
        console.log(error.message)
        throw error
    }
    

   

}




module.exports = { createEncryptPassword, decryptPassword, generateJWT, verifyToken }