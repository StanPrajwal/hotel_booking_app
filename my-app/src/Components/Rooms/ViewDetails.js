import Carousel from 'react-bootstrap/Carousel';

import { BiRupee, BiBath, BiCctv } from 'react-icons/bi';
import { AiOutlineWifi, AiOutlineCar } from 'react-icons/ai';
import { TbElevator } from 'react-icons/tb';
import { ImPower } from 'react-icons/im';
import { GrDocumentVideo } from 'react-icons/gr';
import { FaCreditCard } from 'react-icons/fa';
import { FiAirplay } from 'react-icons/fi';
import { useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import "./ViewDetails.css"
import ModalPopup from './Modal';
import NavBar from '../LandingPage/Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
function ViewDetails() {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const bookingSchema = yup.object().shape({
        full_name: yup.string().required("Field Mandatory"),
        email: yup.string().required("Field Mandatory").email(),
        payment: yup.string().required("Field Mandatory"),
        phone: yup.string().required('Field Mandatory').min(10).max(10).matches(phoneRegExp, 'Phone number is not valid')
    })
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(bookingSchema)
    })
    
   
    const { state } = useLocation()
   
    
   
    const [index, setIndex] = useState(0);
    const [popup, setPopup] = useState("none")
    const [date, setDate] = useState({ from: "", to: "", rooms: 1, guest: 1 })
    const [response,getResponse] = useState()

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const getDate = (e) => {
        const { name, value } = e.target
        setDate(prev => {
            return { ...prev, [name]: value }
        })
    }
    const onSubmit = (data) => {
        
        if (date?.from && date?.to) {
            
            data.number_of_rooms = date.rooms
            data.number_of_guest = date.guest
            data.total_price = (Math.abs(parseInt(date?.from.split("-")[2]) - parseInt(date?.to.split("-")[2])) + 1) ?
                                (Math.abs(parseInt(date?.from.split("-")[2]) - parseInt(date?.to.split("-")[2])) + 1) * state?.price_per_night * (state?.max_count >= parseInt(date.guest) ? 1 : parseInt(date.guest) / state?.max_count)
                                : state?.price_per_night
            data.hotel_id = state._id
            data.from = date.from
            data.to = date.to
            data.hotel_name = state.hotel_name,
            data.hotel_address = state.address,
            data.price_per_day = state.price_per_night
            data.user_id = localStorage.getItem('token')

            axios.post("http://localhost:4000/booking",{data})
                .then((res)=>{
                    getResponse(res.data)
                    console.log(response)
                })
                .catch((res)=>console.log(res))
        } else {
            alert("Please Choose slot")
        }

    }

    return <div>
        <NavBar />

        <div className="date-of-booking">
            <div className="date">
                <label>Check-In</label>
                <input type="date"
                    name="from"
                    onChange={(e) => getDate(e)}
                />
            </div>
            <div className="date">
                <label>Check-Out</label>
                <input type="date"
                    name="to"
                    onChange={(e) => getDate(e)}
                />
            </div>
            <div className="no-ofrooms">
                <label>Rooms</label>
                <input type="number" min="1"
                    value={date.rooms}
                    name="rooms"
                    onChange={(e) => getDate(e)}
                />
            </div>
            <div className="no-of-guests">
                <label>Guests</label>
                <input type="number" min="1"
                    value={date.guest}
                    name="guest"
                    onChange={(e) => getDate(e)}
                />
            </div>
        </div>

        <div className='slider'>
            <Carousel activeIndex={index} onSelect={handleSelect} className="view-slides">
                {state?.image_url.map(image => {
                    return <Carousel.Item className="view-slide">
                        <img

                            src={image}
                            alt="First slide"
                        />
                    </Carousel.Item>
                })}

            </Carousel>
        </div>


        <div className="booking-part">
            <div className='hotel-details'>
                <h1 className="title">{state?.hotel_name}</h1>
                <p className='address'>{`${state?.address}, ${state.city}, ${state.state}, ${state.country} - ${state.pincode}`}</p>
                <div>
                    <h4 className='sub-title'>Description</h4>
                    <p>{state?.description}</p>
                    <p>Price per day : {state?.price_per_night}</p>
                    <p>Maximum per room: {state?.max_count}</p>
                </div>

                <h4 className='sub-title'>Hotel Facilities</h4>
                <div className='hotel-facilities'>
                    <span><AiOutlineWifi /> WiFi</span>
                    <span><FiAirplay /> AC</span>
                    <span><GrDocumentVideo /> TV</span>
                    <span><BiBath /> Geyser</span>
                    <span><ImPower /> Power backup</span>
                    <span><AiOutlineCar /> Parking Facility</span>
                    <span><TbElevator /> Elevator</span>
                    <span><BiCctv /> CCTV cameras</span>
                    <span><FaCreditCard /> Card Payment</span>

                </div>
                <div>
                    <h4 className='sub-title'>Hotel Policies</h4>
                    <ul>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                    </ul>
                </div>
            </div>
            <div className="payment-details">
                <form className='payment' onSubmit={handleSubmit(onSubmit)}>
                    <h2>Booking Detais</h2>
                    <div className='user-info'>
                        <label>Full name</label>
                        <input
                            {...register("full_name")}
                            placeholder='First and Last ane'


                        />
                        <p className="error">{errors.full_name?.message}</p>
                    </div>
                    <div className='user-info'>
                        <label>
                            Phone Number
                        </label>
                        <input
                            {...register("phone")}
                            placeholder='eg:9797979799'


                        />
                        <p className="error">{errors.phone?.message}</p>
                    </div >
                    <div className='user-info'>
                        <label>
                            Email
                        </label>
                        <input
                            {...register("email")}
                            placeholder='eg:joe@gmail.com'


                        />
                        <p className="error">{errors.email?.message}</p>
                    </div>

                    <hr />
                    <div className="slot-date">
                        <span>From: {`${date?.from} TO ${date?.to}`}</span>
                    </div>
                    <p className='amount'>Number of Rooms <span>{date?.rooms}</span></p>
                    <p className='amount'>Number of Guests <span>{date.guest}</span></p>
                    <p>Days Staying :{
                        Math.abs(parseInt(date?.from.split("-")[2]) - parseInt(date?.to.split("-")[2])) + 1 ?
                            Math.abs(parseInt(date?.from.split("-")[2]) - parseInt(date?.to.split("-")[2])) + 1 : 1}</p>
                    <hr />
                    <p className='amount'><span>Total Price:</span><span><BiRupee />{
                        (Math.abs(parseInt(date?.from.split("-")[2]) - parseInt(date?.to.split("-")[2])) + 1) ?
                            (Math.abs(parseInt(date?.from.split("-")[2]) - parseInt(date?.to.split("-")[2])) + 1) * state?.price_per_night * (state?.max_count >= parseInt(date.guest) ? 1 : parseInt(date.guest) / state?.max_count)
                            : state?.price_per_night
                    }</span></p>
                    <div>
                        <h6>Payment Type</h6>
                        <select className="payment-type"
                            {...register("payment")}

                        >
                            <option>Debit Card</option>
                            <option>Credit Card</option>
                            <option>UPI Payment</option>
                            <option>Cash on</option>
                        </select>
                    </div>
                    
                    <button className='confirm'

                    >Confirm Book</button>

                </form>
            </div>


        </div>



        <ModalPopup
            response={response}
            getResponse={getResponse}
        />

    </div>
}

export default ViewDetails