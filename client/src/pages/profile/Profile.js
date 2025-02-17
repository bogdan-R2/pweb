import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCallback } from 'react';
import Header from '../../components/header/Header';
import ProfileComponent from '../../components/profile/ProfileComponent';
const API = process.env.REACT_APP_API;




const Profile = (props) => {

    console.log("profile page " + props.currUserEmail)
    const [currentUser, setCurrentUser] = useState({value: {}, isFetching: false});
    const emailValue = props.currUserEmail;
    const [showFormEnroll, setShowFormEnroll] = useState(false);

    const handleShowFormEnroll = () => setShowFormEnroll(true);
  	const handleCloseFormEnroll = () => setShowFormEnroll(false);

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
              console.log("email value in else "+ emailValue );
              console.log("email is " + emailValue)
              if(userValue.data.data !== null)
              {
                  setCurrentUser({value: userValue.data.data, isFetching: false}); 
              }
           }
           

      } catch(error) {
        setCurrentUser({value: {}, isFetching: false})
        throw new Error(error);
      }
    
    }, [emailValue])
    useEffect (() => { 
      setAsyncUser();
  }, [setAsyncUser]);

  return (
    <>
        {/* The page is going to load only after the data has been fetched */}
        {!currentUser.isFetching && (
            <>
               <Header userData={currentUser.value}/>
                <br />
                <ProfileComponent
                    userData={currentUser.value}
                    
                />
            </>
        )}
    </>
);
	
};

export default Profile;
