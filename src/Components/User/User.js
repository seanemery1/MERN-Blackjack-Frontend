import React, { useState, useEffect, useContext } from "react";
import "./User.css";
import {withRouter} from "react-router";
import { useParams } from 'react-router';
import LogOutHooks from "../LogOutHooks/LogOutHooks";
import UserContext from '../../libs/UserContext';
import { Redirect } from "react-router";
import { getSessionCookie } from '../../libs/sessions.js';
import { setSessionCookie } from '../../libs/sessions.js';
const User = () => {

    const {userInfo, setInfo, setAlert, refreshUpdate} = useContext(UserContext);
 
    const  _clicked = async () => {

        if (userInfo.gameID === undefined||userInfo.gameSession['canLeave']) {
            console.log("succ");
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    resume: false,
                })
            };
            await fetch(`http://localhost:5000/NewGameSession/${userInfo.uuid}`, requestOptions)
            .then(response => response.json())
            .then(
                (data) => {
                    setInfo({
                                isLoggedIn: userInfo.isLoggedIn,
                                name: userInfo.name,
                                email: userInfo.email,
                                password: userInfo.password,
                                uuid: userInfo.uuid,
                                balance: userInfo.balance,
                                gameID: data._id,
                                gameSession: data
                        });
                            setSessionCookie({
                                isLoggedIn: userInfo.isLoggedIn,
                                name: userInfo.name,
                                email: userInfo.email,
                                password: userInfo.password,
                                uuid: userInfo.uuid,
                                balance: userInfo.balance,
                                gameID: data._id,
                                gameSession: data
                            });
               
        }).then(refreshUpdate);
 
            return window.location.href=`/GameSession/${userInfo.uuid}`;//(<Redirect to="/GameSession"/>)
        } else {
            console.log("fail");
            return window.location.href=`/GameSession/${userInfo.uuid}`;
        }
    }
        
        
    if (userInfo.isLoggedIn) {
       
        let button;

        if (userInfo.gameID===undefined||userInfo.gameSession['canLeave']) { //userInfo.gameSession['canLeave']||
            button = <div className="newGame" onClick={_clicked}>
                Click here to start a new game</div>;
        } else {
            button = <div className="newGame" onClick={_clicked}>
                Click here to resume an old game
            </div>
        }
            
        return (<div className="user">
            <LogOutHooks></LogOutHooks>
            {/* <div className="go" onClick={clicked}>Go</div> */}
            <h1>value:{userInfo.email}</h1>
            <h1>${userInfo.uuid}</h1>
            <h1>${userInfo.name}</h1>
            <h1>${userInfo.balance}</h1>
            {/* <h1>${userInfo.gameSession['_id']}</h1> */}
            {button}
        </div>); 
    } else {
        return(<div className="user">
            <h1>Loading...</h1>
            <LogOutHooks></LogOutHooks>
        </div>);
    }    
}


export default User;