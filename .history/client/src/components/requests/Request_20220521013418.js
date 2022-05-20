import React, { useState } from "react";
import {Grid, Item} from "@mui/material"

import { useNavigate } from "react-router";


const Request = (props) => {

    const [error, setError] = useState("");
    const [owner, setOwner] = useState("");


return(
<>
<div className="card" style={{width:'23rem', height:'25rem'}}>

<div className="card text-white bg-primary mb-3" >
  <div className="card-header">Owner: {props.userData.email}</div>
  <div className="card-body">
  <h2 className="card-title">Type: {props.userRequest.requestType}</h2>
    <h3 className="card-title">{props.userRequest.category}</h3>
    <p className="card-text">{props.userRequest.city}</p>
    <p className="card-text">{props.userRequest.phoneNumber}</p>
    <p className="card-text">{props.userRequest.description}</p>
  </div>
</div>
</div>
</>
    );
};

export default Request;