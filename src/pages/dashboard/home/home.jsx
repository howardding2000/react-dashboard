import React from "react";
import "./home.less";
import dashboard from "../../../assets/img/dashboard.svg";
import { Card } from "antd";
import Center from "components/ui/Center";
import LineChartItem from "components/charts/LineChartItem";
import PieChartItem from "components/charts/PieChartItem";
import BarChartItem from "components/charts/BarChartItem";
import {
  salesData,
  salesVolumeData,
  salesTotal,
  salesVolumeTotal,
} from "config/chart-config";

const Home = () => {
  return (
    <Card
      bodyStyle={{
        height: "100%",
        width: "100%",
      }}
    >
      <div
        className='home_main'
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4 25%)",
          gridTemplateRows: "repeat(4 25%)",
          gap: "1rem",
        }}
      >
        <Center className='welcome_img' style={{ gridColumn: "1/2" }}>
          <img src={dashboard} alt='dashboard' />
          <p>Welcome to React-Dashboard</p>
        </Center>
        <Center style={{ gridColumn: "2/5" }}>
          <LineChartItem data={salesData} />
          <h2>Sales</h2>
        </Center>
        <Center tyle={{ gridColumn: "1/3" }}>
          <PieChartItem data={salesTotal} />
          <h2>Sales</h2>
        </Center>
        <Center style={{ gridColumn: "3/5" }}>
          <PieChartItem data={salesVolumeTotal} isCurrency={true} />
          <h2>Sales Volume($)</h2>
        </Center>
        <Center style={{ gridColumn: "1/3" }}>
          <BarChartItem data={salesData} />
          <h2>Sales</h2>
        </Center>
        <Center style={{ gridColumn: "3/5" }}>
          <BarChartItem data={salesVolumeData} isCurrency={true} />
          <h2>Sales Volume($)</h2>
        </Center>
      </div>
    </Card>
  );
};

export default Home;
