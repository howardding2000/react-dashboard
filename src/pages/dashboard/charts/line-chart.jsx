import React from "react";
import { Card } from "antd";
import Center from "components/ui/Center";
import { salesData, salesVolumeData } from "config/chart-config";
import LienChartItem from "components/charts/LineChartItem";

const ReLineChart = () => {
  const title = "2021-2022 Sales Report";

  return (
    <Card title={title} style={{ height: "100%" }}>
      <Center style={{ display: "flex", flexDirection: "row" }}>
        <Center>
          <LienChartItem data={salesData} />
          <h2>Sales</h2>
        </Center>
        <Center>
          <LienChartItem data={salesVolumeData} />
          <h2>Sales Volume($)</h2>
        </Center>
      </Center>
    </Card>
  );
};

export default ReLineChart;
