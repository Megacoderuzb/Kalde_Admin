import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

// Components
import Header from "../Components/Header";
import Prays from "../Components/Prays";

const CategoriesList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) navigate("/login");
  }, []);

  return (
    <>
      <Header />
      <Prays />
      <Footer />
    </>
  );
};

export default CategoriesList;
