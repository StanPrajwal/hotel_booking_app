import Card from 'react-bootstrap/Card';
import HotelNavbar from './NavBar';
function Bookings(){
    return <div>
        <HotelNavbar/>
        <h2>Total Bookings</h2>
        <div>
        <Card style={{ width: '18rem' }} className="shadow">
                <Card.Body>
                    <Card.Title>Prajwal A</Card.Title>
                    <Card.Text>
                        <p>Phone :<span>79777777777</span></p>
                        <p>From Date:12-02-2023</p>
                        <p>To Date:12-02-2023</p>
                        <p>Status: <span>Confirmed</span></p>
                        <hr/>
                        <Card.Subtitle className="mb-2 text-muted">Amount</Card.Subtitle>
                        <p>Number of Rooms : <span>3</span></p>
                        <p>Number Of Guests: <span>2</span></p>
                        <p>Rent per Day:<span>1000</span></p>
                        <h4>Total : <span>2000</span></h4>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    </div>
}
export default Bookings