
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import Axios from "axios"
import "./Register.css"
import NavBar from "../LandingPage/Navbar";
import Button from "react-bootstrap/esm/Button";


function Login() {
    const errorCss = {
        color: "red",
        fontWeight: "100"
    }
    const [error, setError] = useState("")
    const [flag, setFlag] = useState(false)
    const navigate = useNavigate()

    const registerSchema = yup.object().shape({
        Password: yup.string().required(),
        EmailOrPhone: yup.string().required(),


    })
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(registerSchema)
    })
    const onSubmit = (data) => {
        console.log(data)

        setFlag(!flag)
        Axios.post("http://localhost:4000/user/login",{data})
            .then((res)=>{
                localStorage.setItem("token",res.data.token)
                console.log(res.data.token)
                navigate('/hotel')
                setFlag(!flag)

            })
            .catch((err)=>{
                setError(err.response.data.error)
            })
    }
    const handler =()=>{
        setError()
    }
    return (<>

        <NavBar />
        {error ? <div class="alert alert-warning  existed" role="alert">
            <strong>{error}</strong>
        </div> : ""}
        <div className="left-right">
            <div className="left-part">
                <p className="left-title">Small Nap</p>
                <p className="left-sub-title" >Take rest before your Achivements</p>
                <Button
                    onClick={()=>navigate('/hotel')}
                >Login For Hotel Owner</Button>
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <h1 className="title">Login Here</h1>
                    <div className="box">

                        <input

                            {...register("EmailOrPhone")}
                            placeholder="Username"
                            autoComplete="off"
                            onChange={handler}
                        />

                        <label style={errors.EmailOrPhone?.message ? errorCss : {}}>Email / Phone</label>
                    </div>
                    <p className="error">{errors.EmailOrPhone?.message}</p>

                    <div className="box">

                        <input
                            type="password"
                            {...register("Password")}
                            placeholder="Password"
                            autoComplete="off"
                            onChange={handler}
                        />
                        <label style={errors.Password?.message ? errorCss : {}}>Password</label>

                    </div>
                    <p className="error">{errors.Password?.message}</p>
                    {/* <div className="box">
                        <p>Registering as Hotel Owner?</p>
                       <select>
                            
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                       </select>
                        <label style={errors.Password?.message ? errorCss : {}}>Password</label>

                    </div> */}
                    <p className="error">{errors.Password?.message}</p>

                    <button>Sign In</button>
                    <span
                        className="forget-password"
                        onClick={() => navigate("/forgetpassword")}
                    >
                        Forget Password?
                    </span>

                    <p className="singup-page">New User?
                        <span
                            className="singUp"
                            onClick={() => navigate('/register')}
                        > SIGN UP</span>
                    </p>

                </form>
            </div>
        </div>


    </>
    );
}
export default Login