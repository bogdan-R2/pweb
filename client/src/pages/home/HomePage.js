import React from "react";
import Header from "../../components/header/Header";
//import { useFetch } from "../../contexts/FetchContext";
import { useState, useEffect } from "react";
import { getAuth} from "firebase/auth";
import { useFetch } from '../../contexts/FetchContext';
import axios from "axios";
import "./HomePage.css";
import { checkPropTypes } from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";
import { Card, Modal, Button } from "react-bootstrap";
import AddRequestForm from "../../components/requests/AddRequestForm";
import { useCallback } from "react";
import HomeImg from "./HomeImg";

const API = process.env.REACT_APP_API;



const HomePage = (props) => {
    
    console.log("home page " + props.currUserEmail);
    // todo add error messages
    const [currentUser, setCurrentUser] = useState({value: {}, isFetching: false});
    const emailValue = props.currUserEmail;
    const [showFormEnroll, setShowFormEnroll] = useState(false);

    const handleShowFormEnroll = () => setShowFormEnroll(true);
  	const handleCloseFormEnroll = () => setShowFormEnroll(false);

    
    const onFormSubmit = (e) => {
      e.preventDefault();
      handleCloseFormEnroll();
    };


    const setAsyncUser = useCallback(async () => {
      try {
        //setUserEmail(getAuth().currentUser.email);
        //setUserEmail(getAuth().currentUser.email);
        setCurrentUser({value: {}, isFetching: true})
        //const userEmailValue = getAuth().currentUser.email;
        console.log("email value in fetch" + emailValue );   
        const userValue = await axios.get(`http://pweb-api:8091/api/users/${emailValue}`);
        if(!emailValue && userValue.data.data === null ) {
              setCurrentUser({value: {}, isFetching: true}); 
              // a fost false
           }
           else 
           {
              if(userValue.data.data !== null && userValue !== undefined)
              {
                  setCurrentUser({value: userValue.data.data, isFetching: false}); 
              }
           }
           

      } catch(error) {
        setCurrentUser({value: {}, isFetching: false})
        throw new Error(error);
      }
    // nu era currentUser inainte
    }, [props.currUserEmail])
    useEffect (() => { 
      setAsyncUser();
  }, [setAsyncUser]);


    return (
    <>
    {!currentUser.isFetching && (
        <>
           <Header userData={currentUser.value}/>
           <Card key={currentUser.value._id}>
            <Card.Header>
            <Button className="btn-add-request" onClick={handleShowFormEnroll}>
						<b>Add Request/Offer</b>
					</Button>
            </Card.Header>
            <Card.Body>
              <Modal
              show={showFormEnroll}
              onHide={handleCloseFormEnroll}
              backdrop="static"
              keyboard={false}
            >
                <Modal.Header closeButton>
                  <Modal.Title>Add Request/Offer </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AddRequestForm onSubmit={onFormSubmit} userData={currentUser.value} />
                </Modal.Body>
              </Modal>
            </Card.Body>
           </Card>
           <div className="img">
           <HomeImg/>
           </div>
        
</>
    )}
    </>

    )
};

export default HomePage;