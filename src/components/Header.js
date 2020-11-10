import React from "react";
import logo from "../assets/logo/aerolab-logo.svg"
import Profile from "./Profile"

const Header = () =>{

    return(
        <div className="headerContainer">
            <img className="headerLogo" src={logo}>
            </img>
            <Profile></Profile>
        </div>
    )

}

export default Header