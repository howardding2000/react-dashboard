import React from "react";
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

const COLORS = ["#8884d8", "#82ca9d", "#FCAD7E"];

const LienChartItem = ({ data, ...props }) => {
  const keys = Object.keys(data[0]).slice(1);
  return (
    <ResponsiveContainer width='99%'>
      <LineChart
        width={450}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20, 
        }}
        {...props}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys.map((item, index) => (
          <Line
            key={item}
            type='monotone'
            dataKey={item}
            stroke={COLORS[index % COLORS.length]}
            activeDot={index === 0 && { r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default React.memo(LienChartItem);
