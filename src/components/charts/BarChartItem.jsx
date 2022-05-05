import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {CHART_COLORS} from 'config/chart-config';

const BarChartItem = ({ data }) => {
  return (
    <BarChart
      width={450}
      height={300}
      data={data}
      margin={{
        top: 20,
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
      <Bar dataKey='books' stackId='a' fill={CHART_COLORS[0]} />
      <Bar dataKey='games' stackId='a' fill={CHART_COLORS[1]}  />
      <Bar dataKey='laptops' stackId='a' fill={CHART_COLORS[2]}  />
    </BarChart>
  );
};

export default BarChartItem;
