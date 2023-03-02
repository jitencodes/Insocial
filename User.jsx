import { useEffect, createContext, useState} from "react";
import { auth } from "./firebase";

export const UserContext = createContext();

export const UserContextProvider = (props) =>{
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
    
          if (authUser) {
            setUser(authUser);
          } else {
            setUser(false);
          }
        })
      }, [])
      
      return(
        <UserContext.Provider value={{user:[user, setUser]}}>
            {props.children}
        </UserContext.Provider>
    );
};