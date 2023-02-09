import Carousel from 'react-bootstrap/Carousel';
import "./Rooms.css"
function Rooms() {
    return (
        <Carousel fade >
            <Carousel.Item className="slide view-Slide">
                <img
                    className="w-100"
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt="First slide"
                />
               
            </Carousel.Item>
            <Carousel.Item className="slide view-Slide">
                <img
                    className="w-100"
                    src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="Second slide"
                />

              
            </Carousel.Item>
            <Carousel.Item className="slide view-Slide">
                <img
                    className="w-100"
                    src="https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWwlMjByb29tc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}
export default Rooms