import React, { useEffect, useState } from "react";
import HistoryProduct from "./HistoryProduct";

const RedeemHistory = () => {
//   const [user, setUser] = useContext(UserContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const Url =
      "https://private-anon-44244cc0a3-aerolabchallenge.apiary-proxy.com/user/history";
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
        setHistory(res);
      });
  });

  return (
    <div className="historyContainer">
      {history.map((product) => {
        return (
          <HistoryProduct
            date={product.createDate}
            img={product.img.url}
            name={product.name}
          />
        );
      })}
    </div>
  );
};

export default RedeemHistory;
