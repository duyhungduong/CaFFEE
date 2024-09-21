import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import TypeTableList from "../components/TypeTableList";
import AreaTableList from "../components/AreaTableList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"latte"} heading={"Enjoy Latte"} />
      <HorizontalCardProduct category={"matcha"} heading={"Enjoy Matcha"} />
      <VerticalCardProduct category={"matcha"} heading={"Matcha for life"} />
      <VerticalCardProduct category={"latte"} heading={"Real Latte"} />
      <VerticalCardProduct
        category={"cappuccino"}
        heading={"Little Cappuccino"}
      />

      <TypeTableList />
      <AreaTableList />
    </div>
  );
};

export default Home;
