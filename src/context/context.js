import React, {createContext,useEffect,useState} from "react";

const UserContext = createContext()

const UserProvider = (props) =>{
    const [user, setUser] = useState({});
    const {children} = props;
    return(
        <UserContext.Provider value={[user,setUser]}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext,UserProvider};

