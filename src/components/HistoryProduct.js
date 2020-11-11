import React, { useContext } from "react";
import {UserContext} from "../context/context";
import buyIcon from "../assets/icons/buy-blue.svg"
import coinIcon from "../assets/icons/coin.svg"

const HistoryProduct = (props) =>{
    const {img,name,date} = props;

    return(
        <div className="historyItemContainer">
            <div className="historyName">
            <span>{name}</span>
            </div>
           
            <div className="historyImage">
                <img src={img}></img>
            </div>
            <div className="historyDate">
                <span>{date}</span>
            </div>
        </div>
    )

}

export default HistoryProduct