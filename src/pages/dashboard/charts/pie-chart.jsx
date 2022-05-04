import React from "react";
import { Card } from "antd";
import Center from "components/ui/Center";
import PieChartItem from "components/charts/PieChartItem";
import { salesTotal, salesVolumeTotal } from "config/chart-config";

const RePieChart = () => {
  const title = "2021-2022 Sales Report";

  return (
    <Card title={title} style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Center>
          <PieChartItem data={salesTotal} />
          <h2>Sales</h2>
        </Center>
        <Center>
          <PieChartItem data={salesVolumeTotal} isCurrency={true} />
          <h2>Sales Volume($)</h2>
        </Center>
      </div>
    </Card>
  );
};

export default RePieChart;
