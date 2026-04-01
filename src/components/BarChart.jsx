import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip
} from "recharts";

const BarChartComponent = ({ data, dataKey, xKey }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          
          <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis dataKey={xKey} />
          <YAxis />

          <Tooltip />

          <Bar 
            dataKey={dataKey} 
            fill="#9d3984"  // purple theme
            radius={[10, 10, 0, 0]} // rounded top
          />
          
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;