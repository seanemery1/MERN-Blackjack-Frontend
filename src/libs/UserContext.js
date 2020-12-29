import { createContext } from 'react';
import { getSessionCookie } from './sessions.js';


let UserContext = createContext(null);

// const initialState = {
//     isLoggedIn: false,
//     name: "",
//     email: "",
//     uuid: "",
//     balance: 0,
//     gameID: undefined,
//     gameSession: {}
// };

// let reducer = (state, action) => {
//     switch(action.type) {
//         case "reset":
//             return initialState;
//         case "increment":
//             return {...state, count: state.count + 1};
//         case "increment":
//             return {...state, count: state.count + 1};
//         case "increment":
//             return {...state, count: state.count + 1};
//     }
// }
// getSessionCookie()

export default UserContext;


// export function useUserContext() {
//     return useContext(AppContext);
// }