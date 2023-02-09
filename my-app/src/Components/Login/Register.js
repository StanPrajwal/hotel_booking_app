import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Axios from "axios"
import { useState } from "react";
import "./Register.css"
import { useNavigate } from "react-router-dom";
import NavBar from "../LandingPage/Navbar";
import ModalPopup from "../Rooms/Modal";
import Button from "react-bootstrap/esm/Button";

function Register() {
    const [passwordError, setPasswordError] = useState()
    const [error, setError] = useState()
    const [response, getResponse] = useState()
    const navigate = useNavigate()
    const errorCss = {
        color: "red",
        fontWeight: "100"
    }
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const registerSchema = yup.object().shape({
        Firstname: yup.string().required(),
        Lastname: yup.string().required(),
        Password: yup.string().required().min(6).max(10),
        ConfirmPassword: yup.string().required().min(6).max(10),
        Email: yup.string().required().email(),
        Phone: yup.string().required().min(10).max(10).matches(phoneRegExp, 'Phone number is not valid')

    })
    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        resolver: yupResolver(registerSchema)
    })
    const onSubmit = (data) => {
        if (data.Password === data.ConfirmPassword) {
            console.log(data)

            setPasswordError(false)
            Axios.post("http://localhost:4000/user", { data })
                .then((res) => {
                    console.log(res)
                    getResponse(res.data)
                    reset()
                })
                .catch((err) => {
                    console.log(err)
                    setError(err.response.data.error) 
                    console.log(error)
                })
        }
        else {
            setPasswordError(true)
        }

    }
    const handler = () => {
        setError()
        setPasswordError(false)
    }
    return (<div className="main-container">
        <NavBar />
        {error ? <div class="alert alert-warning  existed" role="alert">
            <strong>{error}</strong>
        </div> : ""}

        <div className="left-right">
            <div className="left-part">
                <p className="left-title">Small Nap</p>
                <p className="left-sub-title" >Take rest before your Achivements</p>
                <Button
                    onClick={() => navigate('/hotel')}
                >Login For Hotel Owner</Button>
            </div>
            <div className="form-container">

                <h1>Sing In</h1>


                <form onSubmit={handleSubmit(onSubmit)} className="register-form" >

                    <div>
                        <div className="box">

                            <input

                                {...register("Firstname")}
                                onChange={handler}
                                placeholder="Firstname"
                                autoComplete="off"
                            />

                            <label style={errors.Firstname?.message ? errorCss : {}}>Firat Name</label>
                        </div>
                        <p className="error">{errors.Firstname?.message}</p>
                    </div>
                    <div>
                        <div className="box">

                            <input

                                {...register("Lastname")}
                                onChange={handler}
                                placeholder="Lastname"
                                autoComplete="off"

                            />

                            <label style={errors.Lastname?.message ? errorCss : {}}>Last Name</label>
                        </div>
                        <p className="error">{errors.Lastname?.message}</p>
                    </div>
                    <div>
                        <div className="box">

                            <input

                                {...register("Email")}
                                onChange={handler}
                                placeholder="Email"
                                autoComplete="off"
                            />
                            <label style={errors.Email?.message ? errorCss : {}}>Email</label>

                        </div>
                        <p className="error">{errors.Email?.message}</p>

                    </div>

                    <div>
                        <div className="box">

                            <input
                                type="tel"
                                {...register("Phone")}
                                onChange={handler}
                                placeholder="Phone"
                                autoComplete="off"
                            />
                            <label style={errors.Phone?.message ? errorCss : {}}>Phone</label>
                        </div>
                        <p className="error">{errors.Phone?.message}</p>
                    </div>

                    <div>
                        <div className="box">

                            <input
                                type="password"
                                {...register("Password")}
                                onChange={handler}
                                placeholder="Password"
                                autoComplete="off"
                            />
                            <label style={errors.Password?.message ? errorCss : {}}>Password</label>
                        </div>
                        <p className="error">{errors.Password?.message}</p>
                    </div>
                    <div>
                        <div className="box">


                            <input
                                type="password"
                                {...register("ConfirmPassword")}
                                onChange={handler}
                                placeholder="ConfirmPassword"
                                autoComplete="off"
                            />

                            <label style={errors.ConfirmPassword?.message ? errorCss : {}}>Confirm Password</label>

                        </div>
                        <p className="error">{errors.ConfirmPassword?.message}</p>
                        <p className="error">{passwordError ? "Password doesnot match" : ""}</p>
                    </div>
                    <button id="sign-btn">Sign In</button>
                    <p id="find-login">Go back to
                        <span
                            onClick={() => navigate('/login')}

                        > Login page
                        </span>
                    </p>

                </form>
            </div>
        </div>
        <ModalPopup
            response={response}
            getResponse={getResponse}
        />

    </div>
    );


}


export default Register