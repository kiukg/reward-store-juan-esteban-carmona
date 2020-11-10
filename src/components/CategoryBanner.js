import React from "react";
import logo from "../assets/images/header-x1.png"

const CategoryBanner = () =>{

    return(
        <div className="bannerContainer">
            <span className="bannerCategory">Categoria</span>
            <img className="bannerLogo" src={logo}>
            </img>
        </div>
    )

}

export default CategoryBanner