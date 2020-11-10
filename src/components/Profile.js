import React from "react";
import coinIcon from "../assets/icons/coin.svg"

const Profile = () =>{

    return(
        <div className="profileContainer">
            <span className="profileName">Nombre Largo
            </span>
            <div className="pointCounterContainer">
                <span className="pointCounterText">
                    6000
                </span>
                <img className="pointCounterIcon" src={coinIcon}></img>
            </div>

        </div>
    )

}

export default Profile