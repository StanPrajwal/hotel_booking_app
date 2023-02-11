const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const {  State, City }  = require('country-state-city');
const hotailerRouter = require('./Routers/Hotailer')
const hotelRouter = require("./Routers/Hotel")
const userRouter = require('./Routers/User')
const bookingRouter = require('./Routers/Bookings')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use("/hotailer",hotailerRouter)
app.use("/hotels",hotelRouter)
app.use('/user',userRouter)
app.use('/booking',bookingRouter)



mongoose.connect(process.env.Mongo_URL)
    .then((res)=>console.log('database connected'))
    .catch((err)=>console.log(err.message))
app.listen(4000,()=>console.log(`Server startedat http://localhost:4000`))


// const nodemailer = require("nodemailer");
// let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//   });
  
  

  
//     try {
//       let mailOptions = {
//         from: process.env.EMAIL,
//         to:"",
//         subject: "Subscribed",
//         text: `Hi ,
  
//   Thanks for subscribed our channel.If u have any query reachout ${
//           process.env.EMAIL
//         }
      
//   Thanks and regards,
//   Jennifer Joseph`,
//       };
//       console.log(mailOptions);
//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log("Email sent to " + info.response);
//         }
//       });
//       res.send("Send email succesfully");
//     } catch (e) {
//     //   res.send(e);
//     }

