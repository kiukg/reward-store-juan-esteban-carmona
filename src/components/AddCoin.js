import React, { useContext, useState } from "react";
import { asyncFetch } from "../utils/helpers";
import minus from "../assets/icons/minus.svg";
import plus from "../assets/icons/plus.svg";
import { UserContext } from "../context/context";

const AddCoin = (props) => {
  const [coins, setCoins] = useState(1000);
  const coinArray = [1000, 5000, 7500];
  const [user, setUser] = useContext(UserContext);

  const DecreaseAmount = () => {
    const index = coinArray.findIndex((item) => item == coins);
    const newIndex = index - 1;
    if (newIndex < 0) {
    } else {
      setCoins(coinArray[index - 1]);
    }
  };

  const RaiseAmount = () => {
    const index = coinArray.findIndex((item) => item == coins);
    const newIndex = index + 1;
    if (newIndex >= coinArray.length) {
    } else {
      setCoins(coinArray[index + 1]);
    }
  };

  const SendAmount = async () => {
    const Url =
      "https://private-anon-44244cc0a3-aerolabchallenge.apiary-proxy.com/user/points";
    const headers = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFhYzljZGI5NTIzZTAwMjA3ZTFmYzIiLCJpYXQiOjE2MDUwMjgzMDF9.AmLe0RxgByiXoIvSND0TFzRmZoN1DZQXFh2XAWt21bE",
      }),
      body: JSON.stringify({
        amount: coins,
      }),
    };
    const response = await asyncFetch(Url, headers);

    setUser({
      ...user,
      points: response["New Points"],
    });
    alert(response.message);
    props.close();
  };
  return (
    <div className="addCoinContainer">
      <div className="addCoinInput">
        <div className="addCoinInputNumber">{coins}</div>
        <div className="addCoinButtonSet">
          <div className="addCoinButton" onClick={DecreaseAmount}>
            <img src={minus}></img>
          </div>
          <div className="addCoinButton" onClick={RaiseAmount}>
            <img src={plus}></img>
          </div>
        </div>
      </div>
      <button className="submitButton" onClick={SendAmount}>
        Add amount
      </button>
    </div>
  );
};

export default AddCoin;
