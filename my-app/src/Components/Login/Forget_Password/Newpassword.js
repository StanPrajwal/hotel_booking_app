import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import "./Forget.css"
function NewPassword(){
    const newSchema = yup.object().shape({
       
        Newpassword:yup.string().required().min(6).max(10),
        Confirmpassword:yup.string().required()
            .oneOf([yup.ref('Newpassword')], 'Passwords does not match'),
    })
   const {register,formState:{errors},handleSubmit} = useForm({
    resolver:yupResolver(newSchema)
   })
   const onSubmit = data =>{
         
   }
    return <div className="forget" >
        <form  onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    placeholder="New Password"
                    type="password"
                    {...register("Newpassword")}
                />
                <p className="error">{errors.Newpassword?.message}</p>
            </div>
            <div>
                <input
                    placeholder="Confirm Password"
                    type="password"
                    {...register("Confirmpassword")}
                />
                <p className="error">{errors.Confirmpassword?.message}</p>
            </div>
            <div>
                <button>
                   Change
                </button>
            </div>
        </form>
    </div>
}
export default NewPassword