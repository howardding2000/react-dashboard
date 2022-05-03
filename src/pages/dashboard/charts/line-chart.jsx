import React from "react";
import { Card } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Center from "components/ui/Center";

import { salesData, salesVolumeData } from "config/chart-config";

const ReLineChart = () => {
  const title = "2021-2022 Sales Report";

  return (
    <Card title={title} style={{ height: "100%" }}>
      <Center style={{ display: "flex", flexDirection: "row" }}>
        <Center>
            <LineChart
              width={500}
              height={300}
              data={salesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='monotone'
                dataKey='books'
                stroke='#8884d8'
                activeDot={{ r: 8 }}
              />
              <Line type='monotone' dataKey='games' stroke='#82ca9d' />
              <Line type='monotone' dataKey='laptops' stroke='#FCAD7E' />
            </LineChart>
          <h2>Sales</h2>
        </Center>
        <Center>
          <LineChart
            width={500}
            height={300}
            data={salesVolumeData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='books'
              stroke='#8884d8'
              activeDot={{ r: 8 }}
            />
            <Line type='monotone' dataKey='games' stroke='#82ca9d' />
            <Line type='monotone' dataKey='laptops' stroke='#FCAD7E' />
          </LineChart>
          <h2>Sales Volume($)</h2>
        </Center>
      </Center>
    </Card>
  );
};

export default ReLineChart;
