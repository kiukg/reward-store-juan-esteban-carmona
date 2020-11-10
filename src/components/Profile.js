import React, { useContext, useEffect, useRef, useState } from "react";
import coinIcon from "../assets/icons/coin.svg";
import { UserContext } from "../context/context";
import AddCoin from "./AddCoin";
import ModalDialog from "./ModalDialog";
import RedeemHistory from "./RedeemHistory";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const [menu,setMenu] = useState(false);
  const [modal, setModal] = useState({
      visible:false,
      title:'',
      body:<div></div>
  });

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

  const ShowHistory =()=>{
    setModal({
        body: <RedeemHistory></RedeemHistory>,
        visible:true,
        title:'Redeem History'
    });
    document.querySelector(".modal").style.display='grid';
  }

  const ShowCoins =()=>{
    setModal({
        body:<AddCoin></AddCoin>,
        title:'Coins',
        visible:true,
    });
    document.querySelector(".modal").style.display='grid';
  }

  const HideModal = () => {
      setModal({
          visible:false
      });
      document.querySelector(".modal").style.display='none';
  }

  const ShowMenu = ()=>{
      setMenu(!menu);
  }
  
  return (
    <div className="profileContainer">
      <span className="profileName" onClick={ShowMenu}>{user.name}</span>
      <div className="pointCounterContainer">
        <span className="pointCounterText">{user.points}</span>
        <img className="pointCounterIcon" src={coinIcon}></img>
      </div>
     {menu?(<ul className="profileToogleMenu">
        <li className="profileToogleItem" onClick={ShowHistory}>Redeem history</li>
        <li className="profileToogleItem" onClick={ShowCoins}>Add points</li>
      </ul>):""}
      <ModalDialog properties={modal} close={HideModal}></ModalDialog>
    </div>
  );
};

export default Profile;

