import React from "react";
import { Card } from "antd";
import Center from "components/ui/Center";
import { salesData, salesVolumeData } from "config/chart-config";
import LienChartItem from "components/charts/LineChartItem";

const ReLineChart = () => {
  const title = "2021-2022 Sales Report";

  return (
    <Card
      title={title}
      style={{ height: "100%" }}
      bodyStyle={{
        display: "grid",
        gridTemplateColumns: "Repeat(2 50%)",
        gap:"1rem",
        height:"500px"
      }}
    >
      <Center style={{ gridColumn: "1/2" }}>
        <LienChartItem data={salesData} />
        <h2>Sales</h2>
      </Center>
      <Center style={{ gridColumn: "2/3" }}>
        <LienChartItem data={salesVolumeData} />
        <h2>Sales Volume($)</h2>
      </Center>
    </Card>
  );
};

export default ReLineChart;
