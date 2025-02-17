import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import Request from "./Request";
import {Grid, ListItem, Box} from "@mui/material"
import axios from 'axios';
import Header from "../header/Header";
import './RequestList.css'
import { Navbar, Dropdown } from "react-bootstrap";


const RequestList = (props) => {

    const [error, setError] = useState("");
    const [requestList, setRequestList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const categories = ['Medicine', 'Money', 'Food', 'Clothing', 'Hygiene Products', 'All Requests'];
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [deletedRequest, setDeletedRequest] = useState({});

    useEffect(() => {
        getAllRequests();
        //getCurrentUser();
    }, [selectedCategory, deletedRequest]);

    useEffect(() => {
        //getAllRequests();
        getCurrentUser();
    }, [props.currUserEmail]);


    const handleSelectCategory = (e) => {
        setSelectedCategory(e);
    };
    
    const handleDelete = async () =>{
        await axios.delete(`http://pweb-api:8091/api/request/delete/${props.userRequest._id}`)
        .then((response) => {
            console.log("request deleted neew dis " + response.data.data);
            const deleted = response.data.data;
            setDeletedRequest(deleted);
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    const getAllRequests = async () => {
    console.log("selected category " + selectedCategory);
    ///request/by-category/:category

    if(selectedCategory === 'All Requests' || selectedCategory === 'Category') {
        await axios.get(`http://pweb-api:8091/api/request`)
        .then((response) => {
            const allRequests = response.data.data;
            setLoading(true);
            setRequestList(allRequests);        
        })
        .catch((error) =>{ 
            console.error(`Error: ${error}`);
            setError(error);
            setLoading(true);
        });
    } else {
        await axios.get(`http://pweb-api:8091/api/request/by-category/${selectedCategory}`)
        .then((response) => {
            const allRequests = response.data.data;
            setLoading(true);
            setRequestList(allRequests);        
        })
        .catch((error) =>{ 
            console.error(`Error: ${error}`);
            setError(error);
            setLoading(true);
        });
    
    }
}

const getCurrentUser = async () => {
    if(props.currUserEmail !== undefined) {
    await axios.get(`http://pweb-api:8091/api/users/${props.currUserEmail}`)
    .then((response) => {
        const allRequests = response.data.data;
        setLoading(true);
        setUserData(allRequests);
    })
    .catch((error) => 
    {
        console.error(`Error: ${error}`);
        setError(error);
        setLoading(true);
        
    });
    
}}



return(
    <>
    {requestList &&  userData && loading &&(
        <>
     <Header userData={userData}/> 
     <br></br>
     <div className="flexbox-container">
     <h3> Select category:</h3>

     <Dropdown className="drop-main"
        title={selectedCategory}
        id="dropdown-menu-align-right"
        onSelect={handleSelectCategory}>
            <Dropdown.Toggle className="drop-toggle" variant="success" id="dropdown-basic">
                {selectedCategory}
            </Dropdown.Toggle>
              <Dropdown.Menu className="drop-menu">
             {categories.map((category) => (
                <Dropdown.Item eventKey={category}>{category}</Dropdown.Item>
              ))}
              </Dropdown.Menu>
          </Dropdown>
          </div>
     
    <Grid className="container" container margin={3} padding={5} spacing={10}>
        
    {
        requestList.map(request => (
            <ul>
        <li  key={request._id}>
        <Request
        userRequest = {request}
        userData={userData}
        />
        </li>
        </ul>
    ))}

    </Grid>
    </>
    )}

    </>
    );
};

export default RequestList;