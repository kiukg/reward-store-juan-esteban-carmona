import React, { useState, useEffect } from "react";
import { asyncFetch } from "../utils/helpers";
import ProductItem from "./ProductItem";
import Pagination from "@material-ui/lab/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
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
      <Pagination
        color="primary"
        className="paginationC"
        count={pagination.paginationCounter}
        page={pagination.page}
        siblingCount={1}
        boundaryCount={1}
        onChange={handlePageChange}
      />
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
          />
        );
      })}
    </div>
  );
};

export default Products;
