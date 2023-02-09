import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import Axios from "axios"
import "./LoginRegister.css"
import Button from 'react-bootstrap/Button';
import Hotel_Register from "./Register";
import HotelNavbar from "./NavBar";

function HotailerView() {
    const [error, setError] = useState("")
    const errorCss = {
        color: "red",
        fontWeight: "100"
    }
    const registerSchema = yup.object().shape({
        Password: yup.string().required(),
        EmailOrPhone: yup.string().required("Enter valid Email or phone"),


    })
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(registerSchema)
    })
    const navigate = useNavigate()
    const onSubmit = (data) => {
        console.log(data)
    }
    return <>
    <HotelNavbar/>
            <h1>
                Hotel Manager
            </h1>
        <div className="hotel-Login-register-form">
            
            
                <section className="hotel-Login-register">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        {error ? <p className="error">{error}</p> : ""}
                        <h3 className="title">Hotel Login</h3>
                        <div className="login">

                            <input

                                {...register("EmailOrPhone")}
                                placeholder="Username"
                                autoComplete="off"
                            />

                            <label style={errors.EmailOrPhone?.message ? errorCss : {}}>Email / Phone</label>
                        </div>
                        <p className="error">{errors.EmailOrPhone?.message}</p>

                        <div className="login">

                            <input
                                type="password"
                                {...register("Password")}
                                placeholder="Password"
                                autoComplete="off"
                            />
                            <label style={errors.Password?.message ? errorCss : {}}>Password</label>

                        </div>
                        <p className="error">{errors.Password?.message}</p>


                        <span
                           
                            onClick={() => navigate("/forgetpassword")}
                        >
                            Forget Password?
                        </span>
                        <button>Login In</button>


                    </form>
                </section>
                <section className="hotel-Login-register">
                <h3 className="title">Hotel Registration</h3>
                    <Hotel_Register/>
                </section>
            
        </div>
    </>
}

export default HotailerView