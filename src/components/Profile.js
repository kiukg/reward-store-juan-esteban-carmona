import React, { useContext,useEffect } from "react";
import coinIcon from "../assets/icons/coin.svg"
import {UserContext} from "../context/context";
const Profile = () =>{

    const [user,setUser] = useContext(UserContext)
    
    useEffect(() => {
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
        fetch(Url, headers)
          .then((res) => res.json())
          .then((res) => {
            setUser(res);
          });
      }, []);

    return(
        <div className="profileContainer">
            <span className="profileName">
                {user.name}
            </span>
            <div className="pointCounterContainer">
                <span className="pointCounterText">
                {user.points}
                </span>
                <img className="pointCounterIcon" src={coinIcon}></img>
            </div>

        </div>
    )

}

export default Profile