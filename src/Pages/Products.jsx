import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

// Components
import Header from "../Components/Header";
import Products from "../Components/Products";

const ProductsList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) navigate("/login");
  }, []);

  return (
    <>
      <Header />
      <Products />
      <Footer />
    </>
  );
};

export default ProductsList;
