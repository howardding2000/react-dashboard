import React from "react";
import { Card } from "antd";
import Center from "components/ui/Center";
import BarChartItem from "components/charts/BarChartItem";
import { salesData, salesVolumeData } from "config/chart-config";

const ReBarChart = () => {
  const title = "2021-2022 Sales Report";

  return (
    <Card title={title} style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap:'1rem'
        }}
      >
        <Center>
          <BarChartItem data={salesData} />
          <h2>Sales</h2>
        </Center>
        <Center>
          <BarChartItem data={salesVolumeData} isCurrency={true} />
          <h2>Sales Volume($)</h2>
        </Center>
      </div>
    </Card>
  );
};

export default ReBarChart;
