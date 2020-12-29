import { createContext } from 'react';
import { getSessionCookie } from './sessions.js';


const UserContext = createContext(getSessionCookie());

export default UserContext;


// export function useUserContext() {
//     return useContext(AppContext);
// }