import React from "react";
import buyIcon from "../assets/icons/buy-blue.svg"
import nintendo from "../assets/productPics/Nintendo3DS-x1.png"

const ProductItem = (props) =>{

    return(
        <div className="productItemContainer">
            <div className="productBuyIcon">
                <img src={buyIcon}></img>
            </div>
            <div className="productImage">
                <img src={nintendo}></img>
            </div>
            <div className="productSeparator"></div>
            <div className="productCategory">
                <span>Gaming</span>
            </div>
            <div className="productName">
                <span>Nintendo3DS</span>
            </div>
        </div>
    )

}

export default ProductItem