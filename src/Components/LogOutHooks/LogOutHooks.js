import React, { useState, useEffect, useContext } from "react";
import "./LogOutHooks.css";
import UserContext from '../../libs/UserContext';
import { useGoogleLogout} from 'react-google-login';
import { setSessionCookie, getSessionCookie } from '../../libs/sessions.js';

import * as Cookies from "js-cookie";

const clientId = '851365912464-kpi9s2l4bebr8cn548ghsoslp35ckops.apps.googleusercontent.com';
// class LogIn extends React.Component {
const LogOutHooks = () => {
    // const userInfo = useContext(UserContext);
    // useEffect(
    //     () => {
    //         Cookies.remove("session");
    //         history.push("/");
    //     },
    //     [history]
    // );
    const {setInfo} = useContext(UserContext);
    
    const onLogoutSuccess = (res) => {
        // userInfo.setIsLoggedIn({ isLoggedIn : false});
        //     userInfo.setName({ name : ""});
        //     userInfo.setEmail({ email : ""});
        //     userInfo.setPassword({ password: ""});
        //     userInfo.setUuid({uuid : ""});
        //     userInfo.setBalance({balance: 0});
        //     userInfo.setGameSession({uuid : {}});
            setSessionCookie({
                isLoggedIn: false,
                name: "",
                email:"",
                password: "",
                uuid: "",
                balance: 0,
                gameID: undefined,
                gameSession: {}
            });
            setInfo({
                isLoggedIn: false,
                name: "",
                email: "",
                passsword: "",
                uuid: "",
                balance: 0,
                gameID: undefined,
                gameSession: {}
            });
        alert('Logged out Successfully!');
        
        // setUserInfo({
        //     isLoggedIn: false,
        //     name: "",
        //     email: "",
        //     uuid: "",
        //     balance: 0,
        //     // gameID: undefined,
        //     gameSession: {}
        // });
        
        
        // console.log(getSessionCookie);
        return (window.location.href="/");
    };
    const onFailure = (res) => {
        Cookies.remove("session");
        console.log('Logout failed: res:', res);
        // userInfo.setIsLoggedIn({ isLoggedIn : false});
        //     userInfo.setName({ name : ""});
        //     userInfo.setEmail({ email : ""});
        //     userInfo.setPassword({ password: ""});
        //     userInfo.setUuid({uuid : ""});
        //     userInfo.setBalance({balance: 0});
        //     userInfo.setGameSession({uuid : {}});
        //     setSessionCookie({
        //         isLoggedIn: false,
        //         name: "",
        //         email: "",
        //         password: "",
        //         uuid: "",
        //         balance: 0,
        //         gameSession: {}
        //     });
        setInfo({isLoggedIn: false,
            name: "",
            email: "",
            uuid: "",
            password: "",
            balance: 0,
            gameID: undefined,
            gameSession: {}
          });
        setSessionCookie({
            isLoggedIn: false,
            name: "",
            email: "",
            uuid: "",
            password: "",
            balance: 0,
            gameID: undefined,
            gameSession: {}
        });
            return (window.location.href="/");
        
        // history.push("/");
    };

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure,
        icon: true
    });

       
    return (
        <button onClick={signOut} className ="button">
            <img src="icons/google.svg"></img>
            <span className="buttonText">Sign Out</span>
        </button>
    );
};

export default LogOutHooks;