import React, {createContext,useEffect,useState} from "react";
import { asyncFetch } from "../utils/helpers";

const UserContext = createContext()

const UserProvider = (props) =>{
    const [user, setUser] = useState({});
    const {children} = props;

    useEffect(() => {
      GetUserInfo()
      }, []);

      async function  GetUserInfo(){ 
        const Url =
          "https://private-anon-44244cc0a3-aerolabchallenge.apiary-proxy.com/user/me";
        const headers = {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFhYzljZGI5NTIzZTAwMjA3ZTFmYzIiLCJpYXQiOjE2MDUwMjgzMDF9.AmLe0RxgByiXoIvSND0TFzRmZoN1DZQXFh2XAWt21bE",
          }),
        };
        const response = await asyncFetch(Url, headers);
        setUser(response)
        return user;
      }
      
    return(
        <UserContext.Provider value={[user,setUser,GetUserInfo]}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext,UserProvider};

