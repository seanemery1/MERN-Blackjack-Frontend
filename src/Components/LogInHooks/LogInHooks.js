import React, { useState, useEffect, useContext } from "react";
import "./LogInHooks.css";
import {withRouter} from "react-router";
import { useGoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import UserContext from '../../libs/UserContext';

import * as Cookies from "js-cookie";

import { setSessionCookie, getSessionCookie } from '../../libs/sessions.js';
const clientId = '851365912464-kpi9s2l4bebr8cn548ghsoslp35ckops.apps.googleusercontent.com';


const LogInHooks = () => {
    const {userInfo, setInfo} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const onSuccess = (res) => {
        console.log(userInfo);
        setLoading(true);
        console.log('[Login Success] currentUser:', res.profileObj);
        // refreshTokenSetup(res);
        const tokenID = res.getAuthResponse().id_token;
        const user = res.getBasicProfile();
        console.log('ID: ' + user.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + user.getName());
        console.log('Image URL: ' + user.getImageUrl());
        console.log('Email: ' + user.getEmail());
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.getEmail(),
                name: user.getName(),
                password: null
            })
        };
        // fetch(`http://localhost:5000/LogIn`, requestOptions)
        // .then(response => response.json())
        // .then((data) => {
        //     userInfo.setIsLoggedIn({ isLoggedIn : data.isLoggedIn});
        //     userInfo.setName({ name : data.name});
        //     userInfo.setEmail({ email : data.email});
        //     userInfo.setPassword({ password: data.password});
        //     userInfo.setUuid({uuid : data.uuid});
        //     userInfo.setBalance({balance: 0});
        //     userInfo.setGameSession({gameSession : {}});
        //     setSessionCookie({
        //         isLoggedIn: data.isLoggedIn,
        //         name: data.name,
        //         email: data.email,
        //         password: data.password,
        //         uuid: data.uuid,
        //         balance: data.balance,
        //         gameSession: {}
        //     });
        // });
        setLoading(false);
        fetch(`http://localhost:5000/LogIn`, requestOptions)
        .then(response => response.json())
        .then((data) => {
            setInfo({
                isLoggedIn: data.isLoggedIn,
                name: data.name,
                email: data.email,
                password: data.password,
                uuid: data.uuid,
                balance: data.balance,
                gameID: undefined,
                gameSession: {}
        });
            setSessionCookie({
                isLoggedIn: data.isLoggedIn,
                name: data.name,
                email: data.email,
                uuid: data.uuid,
                password: data.password,
                balance: data.balance,
                gameID: undefined,
                gameSession: {}
        });
    });

        // history.push("/");
        // setLoading(false);
        
    }
 
    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        return (window.location.href="/");
        // Cookies.remove("session");
        // history.push("/");
    };
    const { signIn } = useGoogleLogin({
        onSuccess,
        clientId,
        isSignedIn: true,
        onFailure,
        accessType: 'offline'
      });

    if (loading) {
        return <h1>Loggin in...</h1>
    } 
    return (
        <button onClick={signIn} className ="button">
            <img src="icons/google.svg"></img>
            <span className="buttonTest">Sign in or Log in with Google</span>
        </button>
    );
};
// const initialState = {
    //     name: "",
    //     email: "",
    //     uuid: "",
    //     balance: 0
    //   };
      
      //initialise our state
    
    // const {setUserInfo} = useContext(UserContext);
    // useEffect(
    //     () => {
    //       setUserInfo(getSessionCookie());
    //     },
    //     [userInfo]
    // );
    

export default LogInHooks;

// class LogIn extends React.Component {

// const refreshTokenSetup = (res) => {
//     // Timing to renew access token
//     let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    
//     const refreshToken = async () => {
//         const newAuthRes = await res.reloadAuthResponse();
//         refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
//         console.log('newAuthRes:', newAuthRes);
//         // saveUserToken(newAuthRes.access_token);  <-- save new token
//         localStorage.setItem('authToken', newAuthRes.id_token);
    
//         // Setup the other timer after the first one
//         setTimeout(refreshToken, refreshTiming);
//     };
    
//     // Setup first refresh timer
//     setTimeout(refreshToken, refreshTiming);
// };