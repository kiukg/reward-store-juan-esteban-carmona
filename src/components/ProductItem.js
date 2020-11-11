import React, { useContext, useEffect, useRef, useState } from "react";
import { asyncFetch } from "../utils/helpers";
import { UserContext } from "../context/context";
import buyIcon from "../assets/icons/buy-blue.svg";
import coinIcon from "../assets/icons/coin.svg";

const ProductItem = (props) => {
  const { category, cost, img, name, id,redeem } = props;
  const [hover, setHover] = useState(false);
  const productItemRef = useRef();
  const [user, setUser, GetUserInfo] = useContext(UserContext);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  useEffect(() => {
    productItemRef.current.addEventListener("mousemove", handleMouseEnter);
    productItemRef.current.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      if (productItemRef != null && productItemRef.current != null) {
        productItemRef.current.removeEventListener(
          "mousemove",
          handleMouseEnter
        );
        productItemRef.current.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      }
    };
  },[hover]);

 

  const withTernary = () =>
    !hover ? (
      ""
    ) : user.points > cost ? (
      <div className="hoverCanBuy">
        <label className="remaingPoints">
          Remainig points {user.points - cost}
        </label>
        <button className="buttonCanBuy" onClick={redeem(id)}>
          Redeem Now
        </button>
        
      </div>
    ) : (
      <div className="hoverCantBuy">
        <label className="remaingPoints">Product cost {cost}</label>
        <button className="buttonCanBuy">Cant redeem</button>
      </div>
    );

  return (
    <div className="productItemContainer" ref={productItemRef}>
      {withTernary()}
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
