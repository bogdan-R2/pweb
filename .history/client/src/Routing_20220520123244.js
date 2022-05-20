import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { FetchProvider } from "./contexts/FetchContext";
import HomePage from "./pages/home/HomePage";
import LandingPage from "./pages/landingPage/LandingPage";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import RequestList from "./components/requests/RequestList"
import OfferList from "./components/offers/OfferList"
import axios from "axios";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

const Routing = (props) => {

    const [currentUser, setCurrentUser] = useState({value: {}, isFetching:false});

    useEffect(() => {
        getCurrentUser();
    }, []);
    
    const getCurrentUser = async () => {
        try {
            const mail = props.userEmail;
        console.log("ce e in props" + props.userEmail);
        console.log("mail routing hello" + mail)
        setCurrentUser({value: currentUser.value, isFetching: true})
        const response = await axios.get("http://127.0.0.1:5000/api/users", 
        {params: {email: mail}});
        console.log("my repsonse:" + response);
       
    } catch(error) {
          setCurrentUser({value: {}, isFetching: false})
          throw new Error(error);
        }
        
    }
    


    return (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage />}/>
                <Route exact path="/signup" element={<Signup/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route exact path="/all-requests" element={<RequestList/>}/>
                <Route exact path="/all-offers" element={<OfferList/>}/>

            </Routes>
        </Router>
        
    );
};

export default Routing;