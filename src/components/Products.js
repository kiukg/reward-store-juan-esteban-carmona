import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/context";
import { asyncFetch } from "../utils/helpers";
import ProductItem from "./ProductItem";
import Pagination from "@material-ui/lab/Pagination";
import ModalAlert from "./ModalAlert";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [query,setQuery] = useState({
    category:"-1",
    cost:""
  })
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

  const Categories =  ["Phones", "Gaming", "Laptops", "Cameras", "Audio", "Monitors & TV", "Drones", "Phone Accessories", "Smart Home", "PC Accessories", "Tablets & E-readers", "PC Accesories"];

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

  const CloseModal = () => {
    setRedeemResult({
      visible: false,
      result: true,
      title: "",
      message: "",
    });
    document.querySelector(".modal").style.display = "none";
  };

  const RedeemProduct = (id) => async (event) => {
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
      setRedeemResult({
        visible: true,
        result: true,
        title: "Success",
        message: response.message,
      });
      GetUserInfo();
    }

    if (response.error) {
      setRedeemResult({
        visible: true,
        result: false,
        title: "Error",
        message: response.error,
      });
    }
  };

  const FilterByCost = (event) =>{
    const value = event.target.value
    setQuery({
      ...query,
      cost:value
    })
    Filter(value)
  }

  const FilterByCategory = (event) =>{
    const value = event.target.value
      setQuery({
        ...query,
        category:value
      })
      Filter(value)
  }

  const Filter = (value)=>{
      var result = products.filter(Search, query)
    const newArray = paginate(result, pagination.pageSize, pagination.page);
    setPagination({
      ...pagination,
      page:1,
      paginationCounter: Math.floor(result.length / pagination.pageSize),
      paginatedProducts: newArray,
    });
  }

  function Search(product){
    const contextT=this;
    let filtered = Object.keys(this).every((key)=>{
      switch(key){
        case 'category':
          if(contextT[key]==="-1"){
            return product[key]  
          }
          else{
            
            return product[key]==contextT[key]
          }
        case 'cost':
          if(contextT[key]===""){
            return product[key]  
          }
          else{
          return product[key]==contextT[key]
          }
          
        default:return products
      }

    })
    return filtered;
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
    // FilterBy()
  },[]);

  useEffect((value)=>{
    Filter(value)
  },[query])

  return (
    <div className="productsContainer">
      <div className="selectFilter">
        <select  name="category" onChange={FilterByCategory}>
        <option value="-1" selected>Select a filter</option>
  {Categories.map((item)=>{return <option value={item}>{item}</option>})}
        </select>
        <input placeholder="Cost filter" name="cost" onChange={FilterByCost}></input>
      </div>
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
