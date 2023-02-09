import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function HotelNavbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><span id="small">SMALL</span><span id="nap">NAP</span></Navbar.Brand>
          <Nav className="nav-links">
            <Nav.Link href="/hotel">Home</Nav.Link>
            <Nav.Link href="/bookings">Bookings</Nav.Link>
            <Nav.Link href="/addhotels">Add Hotels</Nav.Link>
            <Nav.Link href ="#pr" className="active"></Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default HotelNavbar;