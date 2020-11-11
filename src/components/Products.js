import React, { useState, useEffect,useContext } from "react";
import { UserContext } from "../context/context";
import { asyncFetch } from "../utils/helpers";
import ProductItem from "./ProductItem";
import Pagination from "@material-ui/lab/Pagination";
import ModalAlert from "./ModalAlert";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser, GetUserInfo] = useContext(UserContext);
  const [redeemResult, setRedeemResult] = useState({
    visible: false,
    result: true,
    title: "",
    message: "",
  });
  const [pagination, setPagination] = useState({
    paginatedProducts: [],
    paginationCounter: 0,
    pageSize: 16,
    page: 1,
  });

  const paginate = (array, pageSize, page) => {
    if (array.lenght == 0) {
      return array;
    }
    return array.slice((page - 1) * pageSize, page * pageSize);
  };

  const handlePageChange = (event, value) => {
    const newArray = paginate(products, pagination.pageSize, value);
    setPagination({
      ...pagination,
      page: value,
      paginatedProducts: newArray,
    });
  };

  const CloseModal =()=>{
    setRedeemResult({
      visible: false,
      result: true,
      title: "",
      message: "",
    });
    document.querySelector(".modal").style.display='none';
  }

   const RedeemProduct = (id)=> async(event) =>{
    
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

      const response = await asyncFetch(Url, headers);
      document.querySelector(".modal").style.display = "grid";
      if (response.message) {
        // console.log("responseOk",response)
        setRedeemResult({
          visible: true,
          result: true,
          title: "Success",
          message: response.message,
        });
        GetUserInfo()
      }

      if (response.error) {
        // console.log("responseFail",response)
        setRedeemResult({
          visible: true,
          result: false,
          title: "Error",
          message: response.error,
        });
      }
    
  }

  useEffect(async () => {
    const Url =
      "https://private-anon-44244cc0a3-aerolabchallenge.apiary-proxy.com/products";
    const headers = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFhYzljZGI5NTIzZTAwMjA3ZTFmYzIiLCJpYXQiOjE2MDUwMjgzMDF9.AmLe0RxgByiXoIvSND0TFzRmZoN1DZQXFh2XAWt21bE",
      }),
    };

    const response = await asyncFetch(Url, headers);
    setProducts(response);
    const newArray = paginate(response, pagination.pageSize, pagination.page);
    setPagination({
      ...pagination,
      paginationCounter: Math.floor(response.length / pagination.pageSize),
      paginatedProducts: newArray,
    });
  }, []);

  return (
    <div className="productsContainer">
      <ModalAlert properties={redeemResult} close={CloseModal}></ModalAlert>
      {pagination.paginatedProducts.map((product) => {
        return (
          <ProductItem
            key={product._id}
            id={product._id}
            category={product.category}
            cost={product.cost}
            img={product.img.url}
            name={product.name}
            cost={product.cost}
            redeem={RedeemProduct}
          />
        );
      })}
      <Pagination
        color="primary"
        className="paginationC"
        count={pagination.paginationCounter}
        page={pagination.page}
        siblingCount={1}
        boundaryCount={1}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Products;
