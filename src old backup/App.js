import './App.css';
//import PropTypes from 'prop-types';
import React, { useState, createContext, useEffect, useContext } from "react";
// import * as Cookies from "js-cookie";
import{
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {withRouter} from "react-router";
import Home from "./Components/Home/Home";
import User from "./Components/User/User";
import GameSession from "./Components/GameSession/GameSession";
import { useGoogleLogin } from 'react-google-login'
// import DrawerNavigator from './navigation/DrawerNavigator';
import UserContext from './libs/UserContext.js';
import { getSessionCookie } from './libs/sessions.js';

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

  
  const [userInfo, setUserInfo] = useState(getSessionCookie());
  // useEffect(
  //   () => {
  //     const cookie = getSessionCookie();
  //     if (cookie !== userInfo) {
  //       setUserInfo(cookie)
  //     };
  //   },
  //   [userInfo]
  // );
  // useEffect(
  //   () => {
  //     setUserInfo(getSessionCookie());
  //   },
  //   [userInfo]
  //   );
    // async function refresh() {
    //     let response = await fetch(`http://localhost:5000/GetLastGame/${userInfo.uuid}`);
    //     response = await response.json();
    //     return response;
        
    // }
    // setSessionCookie(refresh());
    // setUserInfo(refresh());
    
    // let response = refresh()
    // response = {
    //     isLoggedIn: userInfo.isLoggedIn,
    //     name: userInfo.name,
    //     email: userInfo.email,
    //     uuid: userInfo.uuid,
    //     balance: userInfo.balance,
    //     gameID: response._id,
    //     gameSession: response
    // }

  // const {isLoggedIn} = userInfo;
  // useEffect(() => {
  //   setUserInfo(getSessionCookie())
  //   },
  //   [userInfo]
  // );
  // useEffect(
  //   () => {
  //     setUserInfo(getSessionCookie());
  //   },
  //   [userInfo]
  // );
  // useEffect(() => {  
  //     return () => {}
  //   },
  // [...Object.values(userInfo)]);
  // const getData = () => {
  //   fetch(`http://localhost:5000/GetLastGame/${userInfo.uuid}`)
  //   .then((response) => response.json())    
  // }
  // useEffect(() => {
  //   getData().then((data) => setUserInfo({gameSession: data}))
  // }, [userInfo.gameSession]);

  const userSettings = {
    userInfo: userInfo,
    setUserInfo
  };
   
  return (
    <UserContext.Provider value={userSettings}>
      <Router>
      <div className="navbar">
        <h6 style={{ display: "inline" }}>Nav Bar</h6>
      </div>  
        <Switch>
          <Route path="/u/:uuid" component={User}>
          </Route>
          <Route path="/GameSession/:uuid" component={GameSession}>
          </Route>
          <Route path="*" component={Home}>
          </Route>
        </Switch>
    </Router>
    </UserContext.Provider>
    
    );
  // return (
  //   <Router history={history}>
  //     <div className="navbar">
  //       <h6 style={{ display: "inline" }}>Nav Bar</h6>
  //     </div>
  //     <Switch>
  //       <Route path="/login" component={LoginHandler} />
  //       <Route path="/logout" component={LogoutHandler} />
  //       <Route path="*" component={ProtectedHandler} />
  //     </Switch>
  //   </Router>
  // );
};
const App = () => {
  return(
    <div className="App">
      <Routes />
    </div>
  );
  
}

export default App;


// constructor(props) {
//   super(props);
//   // this.ref = React.createRef();
//   this.state = {
//       isLoggedIn: false,
//       firstTime: false,
//       message: "",
//       email: "",
//       name: "",
//       uuid: ""
//   };
//   this.onLoginSuccess = this.onLoginSuccess.bind(this);
//   this.onLoginFailure = this.onLoginFailure.bind(this);
//   this.lougout = this.lougout.bind(this);
// }
// onLoginSuccess(res) {
// // onLoginSuccess = (res) => {
//   console.log('[Login Success] currentUser:', res.profileObj);
//   const tokenID = res.getAuthResponse().id_token;
//   const user = res.getBasicProfile();
//   console.log('ID: ' + user.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + user.getName());
//   console.log('Image URL: ' + user.getImageUrl());
//   console.log('Email: ' + user.getEmail());
  
//   const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//           email: user.getEmail(),
//           name: user.getName(),
//           password: ""
//       })
//   };

//   fetch(`http://localhost:5000/LogIn`, requestOptions)
//   .then(response => response.json())
//   .then(data =>
//       // console.log(data.uuid)
//       this.setState({
//           email: data.email,
//           name: data.name,
//           uuid: data.uuid,
//           isLoggedIn: data.success
//       })
//   );
  
// }
// onLoginFailure(res) {
// //onLoginFailure = (res) => {
//   console.log('[Login failed] res:', res)
// }
// lougout(res) {
// //logout = (res) => {
  
//   this.setState({
//       isLoggedIn: false,
//       firstTime: false,
//       email: "",
//       name: "",
//       uuid: ""
//   });
//   alert('Logout made successfully!');
// } 


 // useEffect(() => {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //         email: userInfo.email,
  //         name: userInfo.name,
  //         password: ""
  //     })
  // };
  // fetch(`http://localhost:5000/LogIn`, requestOptions)
  // .then(response => response.json())
  // .then(data => setUserInfo({
  //     isLoggedIn: data.success,
  //     name: data.name,
  //     email: data.email,
  //     uuid: data.uuid,
  //     balance: data.balance
  //  }));
  //  }, []);
  
  // const setUserInfo = (data) => {
  //   isLoggedIn: data.success,
  //   name: data.name,
  //   email: data.email,
  //   uuid: data.uuid,
  //   balance: data.balance
  // };
  // se

  // const { name, email, uuid, balance } = setUserInfo;
  // function handleEventChange(event) {
  //   setUserState({ ...userState, [event.target.name]: event.target.value });
  // }












  // const Routes = () => {
  
  //   const initialState1 = {
  //     isLoggedIn: false,
  //     name: "",
  //     email: "",
  //     password: "",
  //     uuid: "",
  //     balance: 0,
  //     gameSession: {}
  //   };
  //   let [userInfo, setUserInfo] = useState(initialState1);
  
  //   const userSettings = {
  //     userInfo: userInfo,
  //     setUserInfo
      
  //   };
    // const initialState2 = {
    //   gameSession = {}
    // }
    
    //initialise our state//getSessionCookie()
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [balance, setBalance] = useState("");
    // const [uuid, setUuid] = useState("");
    // const [gameSession, setGameSession] = useState(0);  // useEffect(
    
    // const set
   
  //   setSessionCookie({
  //     isLoggedIn: false,
  //     name: "",
  //     email: "",
  //     password: "",
  //     uuid: "",
  //     balance: 0,
  //     gameSession: {}
  // });
  // const userSettings = {
  //   isLoggedIn: isLoggedIn,
  //   name: name,
  //   email: email,
  //   password: password,
  //   balance: balance,
  //   uuid:uuid,
  //   gameSession: gameSession,
  //   setIsLoggedIn,
  //   setName,
  //   setEmail,
  //   setPassword,
  //   setBalance,
  //   setUuid,
  //   setGameSession,
  // };
  // const userSettings = {
  //   isLoggedIn: isLoggedIn,
  //   name: name,
  //   email: email,
  //   password: password,
  //   balance: balance,
  //   uuid:uuid,
  //   gameSession: gameSession,
  //   setIsLoggedIn,
  //   setName,
  //   setEmail,
  //   setPassword,
  //   setBalance,
  //   setUuid,
  //   setGameSession,
  // };
  
    // return (
    //   <UserContext.Provider value={userSettings}>
    //     <Router > 
    //       <Switch>
    //       <Route exact path ="/" component={Home}>
    //         </Route>
    //         <Route path="/u/:uuid" component={User}>
    //         </Route>
    //         <Route path="/GameSession/:uuid" component={GameSession}>
    //         </Route>
    //       </Switch>
    //   </Router>
    //   </UserContext.Provider>
      
    //   );