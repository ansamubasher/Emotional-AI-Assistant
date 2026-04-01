import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#9d3984", "#111013"]; // purple + light purple

const PieChartComponent = ({ data }) => {
  return (
    <div style={{ width: 200, height: 200 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={0}   // makes it donut style
            outerRadius={80}
            dataKey="value"
            stroke="none"
            
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

    

    </div>
  );
};

export default PieChartComponent;