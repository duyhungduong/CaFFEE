import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import TypeTableList from "../components/TypeTableList";
import AreaTableList from "../components/AreaTableList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import HorizonCardTable from "../components/Table/HorizonCardTable";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"latte"} heading={"Enjoy Latte"} />
      <HorizontalCardProduct category={"matcha"} heading={"Enjoy Matcha"} />
      <HorizontalCardProduct category={"cake"} heading={"Enjoy 1st Cake"} />
      <VerticalCardProduct category={"takeaway"} heading={"Take Away Coffee"} />
      <VerticalCardProduct category={"icecoffee"} heading={"Supper IceCoffee"} />
      <VerticalCardProduct category={"matcha"} heading={"Matcha for life"} />
      <VerticalCardProduct category={"latte"} heading={"Real Latte"} />
      <VerticalCardProduct
        category={"cappuccino"}
        heading={"Little Cappuccino"}
      />

      <TypeTableList />
      
      <HorizonCardTable tableType={"Bàn 2 người"} heading={"Bàn dành cho 2 người thoii"} />
      <HorizonCardTable tableType={"Bàn 4 người"} heading={"Bàn dành cho nhóm 4 bạn nè"} />
      <HorizonCardTable tableType={"Bàn dành cho nhóm"} heading={"Bạn dành cho nhóm bạn nhiều người"} />

      <AreaTableList />
    </div>
  );
};

export default Home;
