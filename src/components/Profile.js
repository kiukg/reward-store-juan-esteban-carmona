import React, { useContext, useEffect, useRef, useState } from "react";
import coinIcon from "../assets/icons/coin.svg";
import { UserContext } from "../context/context";
import AddCoin from "./AddCoin";
import ModalDialog from "./ModalDialog";
import RedeemHistory from "./RedeemHistory";

const Profile = () => {
  const [user, setUser,GetUserInfo] = useContext(UserContext);
  const [menu,setMenu] = useState(false);
  const [modal, setModal] = useState({
      visible:false,
      title:'',
      body:<div></div>
  });

  const ShowHistory =()=>{
    setModal({
        body: <RedeemHistory close={HideModal}></RedeemHistory>,
        visible:true,
        title:'Redeem History'
    });
    document.querySelector(".modal").style.display='grid';
  }

  const ShowCoins =()=>{
    setModal({
        body:<AddCoin close={HideModal}></AddCoin>,
        title:'Add Points',
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

