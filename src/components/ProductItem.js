import React, { useContext } from "react";
import {UserContext} from "../context/context";
import buyIcon from "../assets/icons/buy-blue.svg"
import coinIcon from "../assets/icons/coin.svg"

const ProductItem = (props) =>{
    const {category,cost,img,name,id} = props;
    const [user] = useContext(UserContext)
    return(
        <div className="productItemContainer">
            {user.points>cost?<div className="productBuyIcon"><img src={buyIcon}></img></div>:<div className="productNeedCoin">You need {user.points-cost}<img className="pointCounterIcon" src={coinIcon}></img></div>}
            
            <div className="productImage">
                <img src={img}></img>
            </div>
            <div className="productSeparator"></div>
            <div className="productCategory">
                <span>{category}</span>
            </div>
            <div className="productName">
                <span>{name}</span>
            </div>
        </div>
    )

}

export default ProductItem