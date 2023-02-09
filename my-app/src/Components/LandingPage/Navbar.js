import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><span id="small">SMALL</span><span id="nap">NAP</span></Navbar.Brand>
          <Nav className="nav-links">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            {localStorage.getItem('token')?
              <Nav.Link href="/login" onClick={()=>localStorage.clear('token')
              }>Logout</Nav.Link>:
              <Nav.Link href="/login">Login</Nav.Link>}
            
            <Nav.Link href="/userorder">My Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default NavBar;