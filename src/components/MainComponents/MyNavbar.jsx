import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import cartContext from '../Store/cartContext';
import { useContext, useState } from 'react';
import Cart from '../Cart/Cart';
import { NavLink } from "react-router-dom";
import { authContext } from '../Store/authContext';
import { Navigate } from 'react-router-dom';

function MyNavbar() {
  const { totalCartItems } = useContext(cartContext);
  const [isCart, setIsCart] = useState(false);
  const { token, logout } = useContext(authContext)
  const [isLogout, isLetLogout] = useState(false);


  const logoutHandler = () => {
    isLetLogout(true)
    logout();
  }

  return (
    <>
      <Navbar expand="lg" className="bg-dark position-fixed w-100" style={{height:"10vh"}}>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex justify-content-center w-100">
              <Nav.Link as={NavLink} to="/" className='text-light px-5' >Home</Nav.Link>
              <Nav.Link as={NavLink} to="/store" className='text-light px-5'>Store</Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className='text-light px-5'>Contact</Nav.Link>
              <Nav.Link as={NavLink} to="/about" className='text-light px-5'>About</Nav.Link>
              {!token && 
              <Nav.Link as={NavLink} to="/login" className='text-light px-5'>Login</Nav.Link>
              }
            </Nav>
            <Button onClick={() => setIsCart(prev => !prev)} variant="light" className='position-fixed' style={{width:"100px", right:"160px", top:"10px"}}>
              Cart {totalCartItems}
            </Button>
            {token && 
            <Button onClick={logoutHandler} variant="light" className='position-fixed' style={{width:"100px", right:"40px"}}>
              logout
            </Button>
            }

            {isLogout && <Navigate to="/login" replace />}
          </Navbar.Collapse>
        </Container>
        {isCart && <Cart />}
      </Navbar>
      {/* For blank space */}
      <div style={{backgroundColor:"transparent", height:"10vh"}}></div>
    </>
  );
}

export default MyNavbar;
