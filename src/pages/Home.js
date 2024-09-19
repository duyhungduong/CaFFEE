import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import TypeTableList from "../components/TypeTableList";
import AreaTableList from "../components/AreaTableList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";

const Home = () => {
  return <div>
    
    <CategoryList/><BannerProduct/>
    <HorizontalCardProduct category={"latte"} heading={"Enjoy Latte"}/>
    <HorizontalCardProduct category={"matcha"} heading={"Enjoy Matcha"}/>
    <TypeTableList/>
    <AreaTableList/>
  </div>;
};

export default Home;
