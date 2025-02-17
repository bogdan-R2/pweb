import "./header.css";
import "./HeaderStyling.css";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { getAuth} from "firebase/auth";
import {Navbar, Container, Button, NavDropdown} from 'react-bootstrap'
import { Link, Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from '../../assets/img/dove.svg';
import axios from "axios";
import { useNavigate } from "react-router";

import {NavBtn, NavBtnLink } from "../landing-page-nav/NavbarElements";



const Header = ({userData}) => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState({value: {}, isFetching: false});
  const [currentUser, setCurrentUser] = useState({value: {}, isFetching: false});
  const [user, loading, error] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  async function handleLogout() {
    setErrorMessage("");
  
    await auth.signOut().then(function() {
      // Sign-out successful.
      navigate("/");
    }, function(error) {
      // An error happened.
      console.log(error);
      setErrorMessage("Failed to log out.");
    });
  }



  return(
<>
 {/*{ userEmail.value && (*/}
 {userData.email && (
  <Navbar className="nav-bar-main">
      <Navbar.Brand href="/home"
      >
        <img
          alt=""
          src = { logo }
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        WarWeb
        
      </Navbar.Brand>
    
     <NavBtn >
     <NavBtnLink to='/all-requests'>Go to requests</NavBtnLink>
     </NavBtn>

     <NavBtn >
     <NavBtnLink to='/all-offers'>Go to offers</NavBtnLink>
     </NavBtn>
    <Navbar.Toggle />

    <NavBtn >
     <NavBtnLink to='/all-camps'>Go to camps</NavBtnLink>
     </NavBtn>
    <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <NavDropdown
            title={userData.email}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
          </NavDropdown>
          </Navbar.Collapse>

  </Navbar>
  )}
{/*)}*/}

</>
    );
};

export default Header;