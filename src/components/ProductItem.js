import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/context";
import buyIcon from "../assets/icons/buy-blue.svg";
import coinIcon from "../assets/icons/coin.svg";

const ProductItem = (props) => {
  const { category, cost, img, name, id } = props;
  const [hover,setHover] = useState(false);
  const productItemRef = useRef();
  const [user, setUser, GetUserInfo] = useContext(UserContext);


  const handleMouseEnter = () =>{
    setHover(true);
  }
  const handleMouseLeave = () =>{
    setHover(false);
  }
  

  useEffect(()=>{
    // console.log(productItemRef)
    productItemRef.current.addEventListener('mousemove', handleMouseEnter )
    productItemRef.current.addEventListener('mouseleave', handleMouseLeave )
    return ()=>{
      productItemRef.current.removeEventListener('mousemove', handleMouseEnter )
      productItemRef.current.removeEventListener('mouseleave', handleMouseLeave )
    }
  })

  const RedeemProduct = () => {
    const Url =
      "https://private-anon-44244cc0a3-aerolabchallenge.apiary-proxy.com/redeem";
    const headers = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFhYzljZGI5NTIzZTAwMjA3ZTFmYzIiLCJpYXQiOjE2MDUwMjgzMDF9.AmLe0RxgByiXoIvSND0TFzRmZoN1DZQXFh2XAWt21bE",
      }),
      body: JSON.stringify({
        productId: id,
      }),
    };
    fetch(Url, headers)
      .then((res) => res.json())
      .then((res) => {
        GetUserInfo();
      });
  };

  const withTernary = () => (
    (!hover)
      ? ""
      : (user.points > cost)
      ? (<div className="hoverCanBuy">
          <label className="remaingPoints">Remainig points {user.points-cost}</label>
          <button className="buttonCanBuy" onClick={RedeemProduct}>Redeem Now</button>
      </div>)
      : (<div className="hoverCantBuy">
        <label className="remaingPoints">Product cost {cost}</label>
        <button className="buttonCanBuy">Cant redeem</button>
        </div>)
  );


  return (

    <div className="productItemContainer"  ref={productItemRef}>
      {
        withTernary()
      }
      {user.points > cost ? (
        <div className="productBuyIcon">
          <img src={buyIcon}></img>
        </div>
      ) : (
        <div className="productNeedCoin">
          You need {cost - user.points}
          <img className="pointCounterIcon" src={coinIcon}></img>
        </div>
      )}

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
  );
};

export default ProductItem;
