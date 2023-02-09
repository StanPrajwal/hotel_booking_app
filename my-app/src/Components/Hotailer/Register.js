import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react";
import Axios from "axios"
import "./LoginRegister.css"

function Hotel_Register({setError,getResponse}){
    const [passwordError,setPasswordError] = useState()
    const errorCss = {
        color:"red",
        fontWeight:"100"
    }
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const registerSchema = yup.object().shape({
        Firstname:yup.string().required(),
        Lastname:yup.string().required(),
        Password:yup.string().required().min(6).max(10),
        ConfirmPassword:yup.string().required().min(6).max(10),
        Email:yup.string().required().email(),
        Phone:yup.string().required().min(10).max(10).matches(phoneRegExp, 'Phone number is not valid')

    })
    const {register,formState:{errors},handleSubmit,reset} = useForm({
        resolver:yupResolver(registerSchema)
    })
   const onSubmit = (data)=>{
    if(data.Password === data.ConfirmPassword){
        console.log(data)
        
        setPasswordError(false)
        Axios.post("http://localhost:4000/hotailer",{data})
            .then((res)=>{
                console.log(res)
                getResponse(res.data)
                reset()
               
            })
            .catch((err)=>{
                console.log(err.response.data.error)
                setError(err.response.data.error)
                setTimeout(()=>{
                    setError()
                },5000)
            })
    }
    else{
        setPasswordError(true)
    }
    
   }
   
    return <form onSubmit={handleSubmit(onSubmit)} className="register-form" >
                
                <div>
                    <div className="login">
                        
                        <input
                        {...register("Firstname")} 
                        placeholder="Firstname"
                        autoComplete="off"
                        />
                        
                        <label style={errors.Firstname?.message?errorCss:{}}>Firat Name</label>
                    </div>
                    <p className="error">{errors.Firstname?.message}</p>
                </div>
                <div>
                    <div className="login">
                        
                        <input
                            
                        {...register("Lastname")} 
                        placeholder="Lastname"
                        autoComplete="off"
                        
                        />
                        
                        <label style={errors.Lastname?.message?errorCss:{}}>Last Name</label>
                    </div>
                    <p className="error">{errors.Lastname?.message}</p>
                </div>
                <div>
                    <div className="login">
                        
                        <input
                            
                            {...register("Email")} 
                            placeholder="Email"
                            autoComplete="off"
                        />
                        <label style={errors.Email?.message?errorCss:{}}>Email</label>
                        
                    </div>
                    <p className="error">{errors.Email?.message}</p>

                </div>
               
                <div>
                    <div className="login">
                        
                        <input 
                            type="tel"
                            {...register("Phone")} 
                            placeholder="Phone"
                            autoComplete="off"
                        />
                        <label style={errors.Phone?.message?errorCss:{}}>Phone</label>
                    </div>
                    <p className="error">{errors.Phone?.message}</p>
                </div> 
                <div>
                    <div className="login">
                        
                        <input 
                            type="password"
                            {...register("Password")} 
                            placeholder="Password"
                            autoComplete="off"
                        />
                        <label style={errors.Password?.message?errorCss:{}}>Password</label>
                    </div>
                    <p className="error">{errors.Password?.message}</p>
                </div>
                <div>
                    <div className="login">
    
                    
                    <input 
                        type="password"   
                        {...register("ConfirmPassword")} 
                        placeholder="ConfirmPassword"
                        autoComplete="off"
                    />
                    
                    <label style={errors.ConfirmPassword?.message?errorCss:{}}>Confirm Password</label>
                    
                    </div>
                    <p className="error">{errors.ConfirmPassword?.message}</p> 
                    <p className="error">{passwordError?"Password doesnot match":""}</p>
                </div>
                <button id="sign-btn">Sign In</button>
            </form>
   
}
export default Hotel_Register