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
    // const myContext = useContext(UserContext);
    const {userInfo, setUserInfo} = useContext(UserContext);
    // useEffect(() => {
    //     console.log("hi useEffect")
    // }, [userInfo.gameSession]);
    useEffect(
        () => {
          getSessionCookie();
        },
        [userInfo]
    );
    const _clicked = () => {

        if (userInfo.gameID === undefined||userInfo.gameSession['canLeave']) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    balance: userInfo.balance,
                })
            };
            fetch(`http://localhost:5000/NewGameSession/${userInfo.uuid}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                // userInfo.setIsLoggedIn({ isLoggedIn : data.isLoggedIn});
                // userInfo.setName({ name : data.name});
                // userInfo.setEmail({ email : data.email});
                // userInfo.setPassword({ password: data.password});
                // userInfo.setUuid({uuid : data.uuid});
                // userInfo.setBalance({balance: data.balance});
                // userInfo.setGameSession({gameSession : data.gameSession});
                setUserInfo({
                    isLoggedIn: data.isLoggedIn,
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    uuid: data.uuid,
                    balance: data.balance,
                    gameSession: data.gameSession
                });
                setSessionCookie({
                    isLoggedIn: data.isLoggedIn,
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    uuid: data.uuid,
                    balance: data.balance,
                    gameSession: data.gameSession
                });
        });
            //     setUserInfo({
            //         isLoggedIn: userInfo.isLoggedIn,
            //         name: userInfo.name,
            //         email: userInfo.email,
            //         uuid: userInfo.uuid,
            //         balance: userInfo.balance,
            //         // gameID: data._id,
            //         gameSession: data
            // });
            //     setSessionCookie({
            //         isLoggedIn: userInfo.isLoggedIn,
            //         name: userInfo.name,
            //         email: userInfo.email,
            //         uuid: userInfo.uuid,
            //         balance: userInfo.balance,
            //         // gameID: data._id,
            //         gameSession: data
            //     });
            // });
            // history.push("/GameSession");
            return window.location.href=`/GameSession/${userInfo.uuid}`;//(<Redirect to="/GameSession"/>)
        }
    }
        
        // window.location.href=`/GameSession/${userInfo.uuid}`;
      
    // }
    // useEffect(() => {
    //     fetch(`http://localhost:5000/GetLastGame/${userInfo.uuid}`)
    //     .then(response => response.json())
    //     .then((data) => {
    //         setUserInfo({
    //             isLoggedIn: data.isLoggedIn,
    //             name: data.name,
    //             email: data.email,
    //             password: data.password,
    //             uuid: data.uuid,
    //             balance: data.balance,
    //             // gameID: data._id,
    //             gameSession: data.gameSession
    //     });
    //         setSessionCookie({
    //             isLoggedIn: data.isLoggedIn,
    //             name: data.name,
    //             email: data.email,
    //             password: data.password,
    //             uuid: data.uuid,
    //             balance: data.balance,
    //             // gameID: data._id,
    //             gameSession: data.gameSession
    //       });});
    //     }, []);


            // userInfo.setIsLoggedIn({ isLoggedIn : data.isLoggedIn});
            // userInfo.setName({ name : data.name});
            // userInfo.setEmail({ email : data.email});
            // userInfo.setPassword({ password: data.password});
            // userInfo.setUuid({uuid : data.uuid});
            // userInfo.setBalance({balance: data.balance});
            // userInfo.setGameSession({gameSession : data.gameSession});
        //     setUserInfo({
        //         isLoggedIn: data.isLoggedIn,
        //         name: data.name,
        //         email: data.email,
        //         uuid: data.uuid,
        //         balance: data.balance,
        //         // gameID: data._id,
        //         gameSession: data.gameSession
        // });
        //     setSessionCookie({
        //         isLoggedIn: data.isLoggedIn,
        //         name: data.name,
        //         email: data.email,
        //         uuid: data.uuid,
        //         balance: data.balance,
        //         // gameID: data._id,
        //         gameSession: data.gameSession
        //   });
        
      
    // const GetLastGameInfo = () => {
    //     console.log(getSessionCookie().isLoggedIn);
    // // }
    // console.log(userInfo.isLoggedIn);
    if (userInfo.isLoggedIn) {
        // GetLastGameInfo = () =>{};
        let button;

        if (userInfo.gameID===undefined||userInfo.gameSession['canLeave']) { //userInfo.gameSession['canLeave']||
            button = <div className="newGame" onClick={_clicked}>
                Click here to start a new game</div>;
        } else {
            button = <div className="newGame" onClick={_clicked}>
                Click here to resume an old game
            </div>
        }
            
        return (<div className="home">
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
        return(<div>
            <h1>Loading...</h1>
            <LogOutHooks></LogOutHooks>
        </div>);
    }
     
    // return(
    //     <div>
    //         <LogOutHooks></LogOutHooks>
    //         <h1>{userInfo.email}</h1>
    //         <h1>penis</h1>
    //     </div>
    //     );
    
}


export default User;