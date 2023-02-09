import "./AddHotels.css"
import HotelNavbar from "./NavBar"
import { State, City } from 'country-state-city';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import Axios from "axios"
import * as yup from "yup"
import ModalPopup from "../Rooms/Modal";
function AddHotels({ Countries }) {
    const [country, setCountry] = useState()
    const [states, setStates] = useState()
    const [Cities, setCities] = useState()
    const [images,getImages] = useState([])
    const [response,getResponse] = useState()
    const [stateCode, setStateCode] = useState()
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const hotelSchema = yup.object().shape({
        hotel_name: yup.string().required("Field required"),
        hotel_type: yup.string().required("Field required"),
        Country: yup.string().required("Country is Required").test(
        value => value && value !== "--Choose Country--"),
        Sta: yup.string().required("Field required").test(
            value => value && value !== "--Choose State--"),
        Citi: yup.string().required("Field required").test(
            value => value && value !== "--Choose City--"),
        address: yup.string().required('Field required'),
        pincode: yup.string().required("Field required").matches(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/, 'Enter valid Pincode'),
        description: yup.string().required('Field required'),
        price_per_night: yup.string().required("Field required"),
        max_count: yup.string().required('Field required'),
        facililies: yup.string().required('Field required'),
        Phone: yup.string().required("Field required").min(10).max(10).matches(phoneRegExp, 'Phone number is not valid')

    })
    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        resolver: yupResolver(hotelSchema)
    })
    const onSubmit = (data)=>{
        
        data.image_url = images
        data.facililies = data.facililies.split(',')
        data.state = data.Sta.split(' ')[1]
        data.country = data.Country.split(' ')[1]
        data.city = data.Citi
        data.hotailer_id = localStorage.getItem("hotelToken")
        console.log(data)
        Axios.post("http://localhost:4000/hotels",{data})
            .then((res)=>{
                console.log(res)
                getResponse(res.data)
                reset()
            })
            .catch((err)=>{
                console.log(err)
                alert("All Fields are mandatory!")
            })
        getImages([])

    }
    const getImage = (e)=>{
       
        
        function preViewFiles(file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
        
            reader.onloadend = () => {
             console.log("Reader",reader.result)
             getImages(prev=>{
                return [...prev,reader.result]
            })
              
            }
          }
          
        const file = e.target.files[0]
        preViewFiles(file)
         
        
       
    }
    return <>
        <HotelNavbar />
        <div className="add-hotels">
            <form className="shadow" onSubmit={handleSubmit(onSubmit)}>
                <section className="hotel-address">
                    <div>
                        <input
                            placeholder="Hotel Name"
                            {...register("hotel_name")}
                        />
                        <p className="error">{errors.hotel_name?.message}</p>

                    </div>
                     <div>
                        <input
                            placeholder="flat,street,Address.."
                            {...register("address")}
                        />
                        <p className="error">{errors.address?.message}</p>
                    </div>
                    <div>
                        <select
                            {...register("Country")}
                            onChange={(e) => {
                                let value = e.target.value.split(" ")
                                setCountry(value[0])
                                setStates(State.getStatesOfCountry(value[0]))
                                
                            }}
                           
                        >
                            <option>--Choose Country--</option>
                            {Countries && Countries.map((country) => {
                                return <option key={country.isoCode || country.countryCode} value={`${country.isoCode || country.countryCode} ${country.name}`}>{country.name}</option>
                            })}
                        </select>
                        <p className="error">{errors.Country?.message}</p>
                    </div>
                    <div>
                        <select
                            {...register("Sta")}
                            onChange={(e) => {
                                let value = e.target.value.split(" ")
                                setCities(City.getCitiesOfCountry(country))
                                setStateCode(value[0])
                                console.log(value)
                               
                            }}
                           
                        >
                            <option>--Choose State--</option>
                            {states && states.map((state) => {
                                return <option key={state.isoCode} value={`${state.isoCode} ${state.name}`}>{state.name}</option>
                            })}
                        </select>
                        <p className="error">{errors.Sta?.message}</p>
                    </div>
                    <div>
                        <select
                            {...register("Citi")}
                        >
                            <option>--Choose City--</option>
                            {Cities && Cities.filter(element => {
                                return element.stateCode === stateCode
                            }).map((city) => {
                                return <option key={city.name}>{city.name}</option>
                            })}
                        </select>
                        <p className="error">{errors.Citi?.message}</p>
                    </div>
                   <div>
                        <input
                            placeholder="Pincode"
                            {...register("pincode")}
                        />
                        <p className="error">{errors.pincode?.message}</p>
                    </div>

                    <div>
                        <input
                            placeholder="Price per day"
                            {...register("price_per_night")}
                        />
                        <p className="error">{errors.price_per_night?.message}</p>
                    </div>
                    <div>
                        <input
                            placeholder="Guests per Room"
                            type="number" min="1"
                            {...register("max_count")}
                        />
                        <p className="error">{errors.max_count?.message}</p>
                    </div>
                    <div className="collection">
                        <select {...register("hotel_type")} >
                            <option>--Type of Rooms--</option>
                            <option >Family</option>
                            <option>Couples</option>
                            <option>Single</option>
                            <option>All</option>
                        </select>
                        <p className="error">{errors.hotel_type?.message}</p>
                    </div>
                    <div>
                        <input
                            placeholder="Phone"
                            {...register("Phone")}
                        />
                        <p className="error">{errors.Phone?.message}</p>
                    </div> 
                   

                </section> 
                 <section className="hotel-images">
                 <div>
                        <label>Room Photo 1</label>
                        <input type="file" 
                            name="image1"
                            onChange={(e)=>getImage(e)} 
                            required
                        />
                        
                    </div>
                    <div>
                        <label>Room Photo 2<input type="file"
                            name="image2"
                            onChange={(e)=>getImage(e)} 
                            required
                        /></label>
                      
                    </div>
                    <div>

                        <label>Room Photo 3</label>
                        <input type="file" required
                            name="image3"
                            onChange={(e)=>getImage(e)} 
                        />
                      
                    </div>
                    <div className="description">
                        <textarea
                            placeholder="Description..."
                            {...register("description")}
                        ></textarea>
                        <p className="error">{errors.description?.message}</p>
                    </div>  
                    <div>
                        <label>Facililies in Your Hotel</label>
                        <textarea
                            placeholder="TV,AC,etc..."
                            {...register("facililies")}
                        ></textarea>
                        <p className="error">{errors.facililies?.message}</p>
                    </div>
                </section>
                <section className="submit-hotel"> 
                    <button className="add-room">Add Room</button>
                    <button className="reset" onClick={()=>reset()}>Reset All</button>
                </section>
                

            </form>
            <ModalPopup response={response} getResponse={getResponse}/>
        </div>
    </>
}
export default AddHotels