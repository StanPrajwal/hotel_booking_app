require("dotenv").config()
const cloudinary = require("cloudinary")
cloudinary.config({ 
    cloud_name: process.env.Cloud_Name, 
    api_key: process.env.Cloudinary_Api_key, 
    api_secret: process.env.Cloudinary_Api_secret
});
const getCloudinaryLink = async(image_url)=>{
    console.log(image_url)
    for(let i=0;i<image_url.length;i++){
        if(image_url[i]){
            let image = image_url[i]
            try {
                const result =  await cloudinary.v2.uploader.upload(image,{  upload_preset: "standefault"})
                console.log(result)
                image_url[i] = result.url
                
            } catch (error) {
                console.log(error.message)
            }
           
        }
        
    }
    return image_url
}
module.exports = {getCloudinaryLink}