import * as Cookies from "js-cookie";

export const setSessionCookie = (session) => {
  console.log("setSessionCookie");
  Cookies.remove("session");
  Cookies.set("session", session, { expires: 14 });
};

export const getSessionCookie = () => {
  
  const sessionCookie = Cookies.get("session");
  const initialState1 = {
    isLoggedIn: false,
    name: "",
    email: "",
    password: "",
    uuid: "",
    balance: 0,
    gameID: undefined,
    gameSession: {}
  };
  
  if (sessionCookie === undefined||sessionCookie===null || sessionCookie === {}) {
    console.log("UNDEFINED");
    return {initialState1};
  } else {
    console.log("Parse Sessuib Cookie");
    console.log(JSON.parse(sessionCookie));
    return JSON.parse(sessionCookie);
  }
};