import NavBar from "./Navbar"
import Card from 'react-bootstrap/Card';
import Filter from "../Filter";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";
const hotelsImages = [
    {
        city: "Banglore",
        name: "Fomous  Hotel",
        image: "https://media.istockphoto.com/id/1370825295/photo/modern-hotel-room-with-double-bed-night-tables-tv-set-and-cityscape-from-the-window.jpg?s=1024x1024&w=is&k=20&c=PQicQnwFiHZ7GRUQRuHNguiG84_7HcEftHB-bjNbgS0="
    },
    {
        city: "Chennai",
        name: "Lunor Hotel",
        image: "https://media.istockphoto.com/id/1344386618/photo/close-up-of-black-luggage-and-surgical-mask.jpg?s=1024x1024&w=is&k=20&c=bSlkWWx_tTC2jCM9oqlJuQlDoVQnacu1jSaYXyXcA9I="
    },
    {
        city: "Trivandrum",
        name: "Lullu  Hotel",
        image: "https://media.istockphoto.com/id/1352189104/photo/young-woman-walking-with-wheeled-luggage-in-hotel-corridor.jpg?s=1024x1024&w=is&k=20&c=24NfxX95kHcYtV_SCNSCS0Vb-zxV-ZpbuTtDOvwQKVI="
    },
    {
        city: "Hydrabad",
        name: "Stan Hotal",
        image: "https://media.istockphoto.com/id/1442558712/photo/hand-of-guest-ringing-reception-bell-on-desk-of-guesthouse-hotel-at-christmas-time-color.jpg?s=1024x1024&w=is&k=20&c=XW0uwPWfqJG5upvVaP0UDH-K72eSzwvMxL8qDr06c8I="
    },
    {
        city: "Hydrabad",
        name: "Stan Hotal",
        image: "https://media.istockphoto.com/id/1442558712/photo/hand-of-guest-ringing-reception-bell-on-desk-of-guesthouse-hotel-at-christmas-time-color.jpg?s=1024x1024&w=is&k=20&c=XW0uwPWfqJG5upvVaP0UDH-K72eSzwvMxL8qDr06c8I="
    },
    {
        city: "Hydrabad",
        name: "Stan Hotal",
        image: "https://media.istockphoto.com/id/1442558712/photo/hand-of-guest-ringing-reception-bell-on-desk-of-guesthouse-hotel-at-christmas-time-color.jpg?s=1024x1024&w=is&k=20&c=XW0uwPWfqJG5upvVaP0UDH-K72eSzwvMxL8qDr06c8I="
    },



]
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 700 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
 
function LandingPage() {
    const [hotels,getHotels] = useState()
    return <div className="home-page">
        <NavBar />
            <Filter getHotels={getHotels}/>
            <h2 className="title">Top Cities</h2>
            <Carousel  arrows={false}  responsive={responsive} className="top-cities" >
                {hotelsImages.map(hotel => {
                    return <Card style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={hotel.image} />
                        <Card.Body>
                            <Card.Title>{hotel.city}</Card.Title>
                            <Card.Text>
                                {hotel.name}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                })}

            </Carousel>
           


        </div>
}

        export default LandingPage