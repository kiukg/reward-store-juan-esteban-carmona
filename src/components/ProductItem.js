import React from "react";
import buyIcon from "../assets/icons/buy-blue.svg"

const ProductItem = (props) =>{
    const {category,cost,img,name,id} = props;
    
    return(
        <div className="productItemContainer">
            <div className="productBuyIcon">
                <img src={buyIcon}></img>
            </div>
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