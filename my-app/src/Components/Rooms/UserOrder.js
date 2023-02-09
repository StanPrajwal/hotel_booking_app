import NavBar from "../LandingPage/Navbar"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from "react";
import Axios from "axios"
import "./UserOrder.css"
function Userorder() {
    const [myBookings, setMyBookings] = useState()
    const [cancelorder,setCancelOrder] = useState()
    const cancelOrder = (id) =>{
        console.log(id)
        Axios.delete(`http://localhost:4000/booking/user/${localStorage.getItem('token')}-${id}`)
            .then((res)=>{console.log(res)
                setCancelOrder(res.data)
                setTimeout(()=>{
                    setCancelOrder()
                },5000)
            })
            .catch((err)=>console.log(err))
    }
    useEffect(() => {
        Axios.get(`http://localhost:4000/booking/user/${localStorage.getItem("token")}`)
            .then((res) => {
                console.log(res.data.bookings)
                setMyBookings(res.data.bookings)
                
            })
            .catch((err) => console.log(err))
    }, [])
    
    return <>
        <NavBar />
        {cancelorder ? <div className="alert alert-warning  existed" role="alert">
            <strong>{cancelorder?.message}</strong>
        </div> : ""}
        <h1>My Bookings</h1>
        <div className="user-order">
        {myBookings && myBookings.map((Booking) => {
                return <Card style={{ width: '18rem' }} className="shadow" key={Booking._id}>
                    <Card.Body>
                        <Card.Title className="title">{Booking?.hotel_name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{Booking?.hotel_address}</Card.Subtitle>
                        <Card.Text>
                            <p>From Date: <span>{Booking.from}</span></p>
                            <p>To Date: <span>{Booking.to}</span></p>
                            <p>Status: {Booking.cancel_order ? <span className="cancel-booking">Canceled</span> :<span className="confirm-booking">Confirmed</span> }</p>
                            <hr />
                            <Card.Subtitle className="mb-2 text-muted">Amount</Card.Subtitle>
                            <p>Number of Rooms : <span>{Booking.number_of_rooms}</span></p>
                            <p>Number Of Guests: <span>{Booking.number_of_guest}</span></p>
                            <p>Rent per Day: <span>{Booking.price_per_day}</span></p>
                            <h4>Total : <span>{Booking.total_price}</span></h4>
                        </Card.Text>
                        <Button variant="outline-danger" onClick={()=>{cancelOrder(Booking._id)}}>Cancel</Button>
                    </Card.Body>
                </Card>
            })}
        </div>
           
        
    </>
}
export default Userorder