// ProductPage.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../redux/actions/courseActions";
import ProductComponent from "./ProductComponent";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your server URL

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
      .get("http://localhost:5000/courses")
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setCourses(response.data));
  };

  useEffect(() => {
    fetchProducts();

    // Listen for real-time updates on likes
    socket.on("likeUpdate", (updatedProducts) => {
      dispatch(setCourses(updatedProducts));
    });

    return () => {
      // Cleanup socket connection on component unmount
      socket.disconnect();
    };
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ui grid container">
      <div className="ui grid container">
        <div className="sixteen wide column" style={{ textAlign: "right" }}>
          <div className="ui segment">
            <div className="ui fluid icon input">
              <input
                type="text"
                placeholder="Search courses by name..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <i className="search icon"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="ui grid container" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ProductComponent products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
