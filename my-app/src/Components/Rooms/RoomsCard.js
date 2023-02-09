import Button from 'react-bootstrap/Button'
import { BiRupee } from 'react-icons/bi';
import { AiOutlineWifi, AiOutlineCar, AiFillStar } from 'react-icons/ai';
import { IoLocationSharp } from 'react-icons/io5';
import { TbElevator } from 'react-icons/tb';
import Axios from "axios"
import Carousel from 'react-bootstrap/Carousel';
import NavBar from "../LandingPage/Navbar"
import Rooms from "./Rooms"
import Filter from '../Filter';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Card() {
    const [hotels,setHotels] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
        Axios.get('http://localhost:4000/hotels')
            .then((res)=>{console.log(res)
                if(res.data?.message){
                    console.log(res.data.message)
                    setHotels('')
                }
                if(res.data?.hotels){
                    setHotels(res.data?.hotels)
                }
                    
                    
            })
            .catch((err)=>console.log(err))
    },[])
    const getCollection = (query)=>{
        console.log(query)
        if(query){
            Axios.get(`http://localhost:4000/hotels/query?q=${query}`)
            .then((res)=>{console.log(res)
                if(res.data?.message){
                    console.log(res.data.message)
                    setHotels('')
                }
                if(res.data?.hotels){
                    setHotels(res.data?.hotels)
                }
            })
            .catch((err)=>console.log(err))
        }
       
    }
    
    return <div className="show-rooms">
        <NavBar/>
       <Filter setHotels={setHotels}/>
        <aside className="sideBar">
            <div className="collections">
                <h6>Small Nap Coollections</h6>
                <div className='collection'>
                    <label for="collection">
                        <input type="radio" name="collection" value="Family" onChange={(e)=>getCollection(e.target.value)}/>
                        Family Rooms
                    </label>
                </div>
                <div className='collection'>
                    <label>
                        <input type="radio" name="collection"  value="Couple" onChange={(e)=>getCollection(e.target.value)}/>
                        Welcomes Couples
                    </label>
                </div>
                <div className='collection'>
                    <label>
                        <input type="radio" name="collection"  value="Single" onChange={(e)=>getCollection(e.target.value)}/>
                        Single Rooms
                    </label>
                </div>
                <div className='collection'>
                    <label>
                        <input type="radio" name="collection" value="All" onChange={(e)=>getCollection(e.target.value)}/>
                        Availabel Rooms
                    </label>
                </div>
            </div>
            <div>
                <h6>Hotel Facility</h6>
                <div className='Facilities'>
                    <div className='facility'>
                        <label>
                            <input type="checkbox" />
                            AC
                        </label>
                    </div>
                    <div className='facility'>
                        <label>
                            <input type="checkbox" />
                            TV
                        </label>
                    </div>
                </div>

            </div>
        </aside>
        <div className=" rooms-container">
        { hotels === "" ?<div className="not-found">
                <h1>Hotel Not Found</h1>
            </div>:
            hotels && hotels.map(hotel=>{
                return <div className="Card">
            
                    
                    <Carousel fade >
                    { hotel.image_url.map(image=>{ 
                        return <Carousel.Item className="slide view-Slide">
                            <img
                                className="w-100"
                                src={image}
                                alt={image}
                            />

                        </Carousel.Item>
                    }) }
                    </Carousel>
                
                <div className="hotel-details">
                    <h4 className='hotel-name'>{hotel.hotel_name}</h4>
                    <p className="address"><IoLocationSharp/> {`${hotel.address}, ${hotel.city}, ${hotel.state}, ${hotel.country}-${hotel.pincode}`}</p>
                    {/* <p><span className="rating">4.2 <AiFillStar className='rating-icon' /></span> (1665 Rating) . very Good</p> */}
                    <p>Maximum Guest per Room: {hotel.max_count}</p>
                    <p>Hotel For : {hotel.hotel_type === "All"?"Family, Couples, Singles..":hotel.hotel_type}</p>
                    <p className='facility'>
                        <span><AiOutlineCar /> Parking facility</span>
                        <span><TbElevator /> Elevator</span>
                        <span><AiOutlineWifi /> Free Wifi</span>
                        <span> + 7 more</span>
                    </p>
                    <h3 className="price"><BiRupee />{hotel.price_per_night}</h3>
                    <div className='btns'>
                        <Button variant="outline-primary" 
                            onClick={()=>navigate('/view-more',{state:hotel})}
                        >View Details</Button>
                        
                        {/* <Button variant="success">Book Now</Button> */}

                    </div>

                </div>
            </div>
        })}
        
        </div>
    </div>
}
export default Card