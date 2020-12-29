import React, { useState, useEffect,  useContext } from "react";
import "./Home.css";
import {withRouter} from "react-router";
import { Redirect } from 'react-router-dom';
import LogInHooks from "../LogInHooks/LogInHooks";
import LogOutHooks from "../LogOutHooks/LogOutHooks";
import UserContext from '../../libs/UserContext';
import { getSessionCookie, setSessionCookie } from  '../../libs/sessions';

const Home = () => {
    
        const {userInfo} = useContext(UserContext);
        useEffect(() => {
            console.log("hi useEffect")
        }, []);
        // console.log(isLoggedIn);
        
        if (userInfo.isLoggedIn) {
            return (window.location.href=`/u/${userInfo.uuid}`);
             
        }
        else {

            return(
                <div className="home">
                    {/*https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del*/}
                    {/* {!userInfo.isLoggedIn && <LogInHooks></LogInHooks>}
                    {userInfo.isLoggedIn &&  <LogOutHooks></LogOutHooks>} */}
              
                    <h1>Welcome to blackjack</h1>
                    <h1>Please login</h1>
                    <LogInHooks></LogInHooks>
                    
                 
                </div>
            );
        }
        // }
            
        // }

        // setUserInfo({
        //     isLoggedIn: false,
        //     name: "",
        //     email: "",
        //     uuid: "",
        //     balance: 0,
        //     // gameID: undefined,
        //     gameSession: {}
        // });

        // if (userInfo.uuid === undefined) {
        //     if (userInfo.isLoggedIn) {

        //         return (<div className="home">
        //                     <LogOutHooks></LogOutHooks>
        //                     <div className="go" onClick={clicked}>Go</div>
        //                     <h1>value:{userInfo.email}</h1>
        //                 <   h1>${userInfo.uuid}</h1>
        //                     <h1>${userInfo.name}</h1>
        //                 </div>);
        //     //     setUserInfo({
        //     //     isLoggedIn: false,
        //     //     name: "",
        //     //     email: "",
        //     //     uuid: "",
        //     //     balance: 0,
        //     //     // gameID: undefined,
        //     //     gameSession: {}
        //     // });
        // }
        
            
        
            
        // } else {
        // console.log("test");
}

export default Home;