import './App.css';
//import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from "react";
// import * as Cookies from "js-cookie";
import{
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import {withRouter} from "react-router";
import Home from "./Components/Home/Home";
import User from "./Components/User/User";
import GameSession from "./Components/GameSession/GameSession";
// import { useGoogleLogin } from 'react-google-login'
// import DrawerNavigator from './navigation/DrawerNavigator';
import UserContext from './libs/UserContext.js';
import { getSessionCookie, setSessionCookie } from './libs/sessions.js';

// import { createBrowserHistory } from 'history';
// import history from "./history"


const Routes = () => {
  // const initialState = {
  //   isLoggedIn: false,
  //   name: "",
  //   email: "",
  //   uuid: "",
  //   balance: 0,
  //   gameID: undefined,
  //   gameSession: {}
  // };
  
  //initialise our state

  
  
   
  return (
      <Router>
      {/* <div className="navbar">
        <h6 style={{ display: "inline" }}>Nav Bar</h6>
      </div>   */}
        <Switch>
          <Route path="/u/:uuid" component={User}>
          </Route>
          <Route path="/GameSession/:uuid" component={GameSession}>
          </Route>
          <Route path="*" component={Home}>
          </Route>
        </Switch>
    </Router>    
    );

};
const App = () => {

  const [userInfo, setUserInfo] = useState(getSessionCookie());
  const [alert, setAlert] = useState(false);

  
  function setInfo(newInfo) {
    setUserInfo(userInfo => newInfo);
    // setSessionCookie(newInfo);
  }
  // const userSettings = {
  //   userInfo: userInfo,
  //   setUserInfo
  // };
  // useEffect(() => {
  //       async function refresh() {
  //           let response = await fetch(`http://localhost:5000/GetLastGame/${userInfo.uuid}`);
  //           response = await response.json();
  //           return response;
  //       }
  //       userInfo = refresh();
  //       await setSessionCookie(userInfo);
  //       await setInfo(userInfo);
        
  //       // let response = refresh()
  //       // response = {
  //       //     isLoggedIn: userInfo.isLoggedIn,
  //       //     name: userInfo.name,
  //       //     email: userInfo.email,
  //       //     uuid: userInfo.uuid,
  //       //     balance: userInfo.balance,
  //       //     gameID: response._id,
  //       //     gameSession: response
  //       // }
  //   }, []);
  
  let mounted = useRef(true);

    useEffect(() => {
      mounted.current = true;


      async function getData(){
        return await fetch(`http://localhost:5000/GetLastGame/${userInfo.uuid}`)
        .then(response => response.json())
      }

      if(!(userInfo.uuid==="")&&!alert) {
        return;
        
      }
      
      getData()
        .then(userInfo => {
          if(mounted.current) {
            // setInfo(userInfo);
            // setInfo(userInfo));
                
                setSessionCookie({
                isLoggedIn: userInfo.isLoggedIn,
                name: userInfo.name,
                email: userInfo.email,
                password: userInfo.password,
                uuid: userInfo.uuid,
                balance: userInfo.balance,
                gameID: userInfo.gameSession['_id'],
                gameSession: userInfo.gameSession});
                setInfo(
                //
                {
                  isLoggedIn: userInfo.isLoggedIn,
                  name: userInfo.name,
                  email: userInfo.email,
                  password: userInfo.password,
                  uuid: userInfo.uuid,
                  balance: userInfo.balance,
                  gameID: userInfo.gameSession['_id'],
                  gameSession: userInfo.gameSession});

     
          }
        })
      return () => mounted.current = false;
     
      
  }, [alert, userInfo])

  useEffect(() => {
    if(alert) {
      setTimeout(() => {
        if(mounted.current) {
          setAlert(false);
        }
      }, 10)
    }
  }, [alert])
  
  const refreshUpdate = () => {
    
    // setUserInfo(getSessionCookie());
    setAlert(true);
  
  }
  // if (!userInfo.isLoggedIn) {
  //   return <div>Loading data from fart</div>
  // }
  return(
    <div className="App">
      {/* {alert && <h2>Submit Successful</h2>} */}
      <UserContext.Provider value={{userInfo: userInfo, setInfo, refreshUpdate, alert: alert, setAlert}}>
        <Routes />
      </UserContext.Provider>
      
    </div>
  );
  
}

export default App;
