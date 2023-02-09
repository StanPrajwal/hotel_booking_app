import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import "./Forget.css"
import { useNavigate } from "react-router-dom";
function ForgetPassword(){
    const navigate = useNavigate()
    const forgetSchema = yup.object().shape({
       
        Email:yup.string().required().email()

    })
   const {register,formState:{errors},handleSubmit} = useForm({
    resolver:yupResolver(forgetSchema)
   })
   const onSubmit = data =>{
        navigate("/forget/newpassword")
   }
    return <div className="forget" >
        <form  onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    placeholder="Enter register email id"
                    type="email"
                    {...register("Email")}
                />
                <p className="error">{errors.Email?.message}</p>
            </div>
            <div>
                <button>
                    Next
                </button>
            </div>
        </form>
    </div>
}
export default ForgetPassword