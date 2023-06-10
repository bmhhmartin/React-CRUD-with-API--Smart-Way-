import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
    return (
        <Navbar collapseOnSelect expand="md" className="NavBar">
            <Container>
                <Navbar.Brand>
                    <Link to='/' style={{color: "white"}}>Logo</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {/* <Nav.Link href="#features">Features</Nav.Link> */}
                </Nav>
                <Nav>
                    <Nav.Link><NavLink to='/'>Home</NavLink></Nav.Link>
                    <Nav.Link><NavLink to='/About'>About</NavLink></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;