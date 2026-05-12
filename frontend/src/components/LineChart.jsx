import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";

const LineChartComponent = ({ data }) => {
  // Map string levels to numeric values for the Y-axis
  const mappedData = data.map((item) => ({
    ...item,
    numericLevel:
      item.stress_level === "High" ? 3 : item.stress_level === "Medium" ? 2 : 1,
    date: new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const level = payload[0].payload.stress_level;
      const levelColor = level === "High" ? "#ff4d4d" : level === "Medium" ? "#ffa500" : "#00ff88";

      return (
        <div style={{
          backgroundColor: "rgba(15, 10, 25, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          padding: "12px 16px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          color: "#fff",
          fontSize: "13px",
          fontFamily: "'Inter', sans-serif"
        }}>
          <p style={{ margin: "0 0 6px 0", opacity: 0.6, fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>{label}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: levelColor }}></div>
            <p style={{ margin: 0, fontWeight: "600", fontSize: "15px" }}>{level} Stress</p>
          </div>
          <p style={{ margin: "4px 0 0 0", fontSize: "11px", opacity: 0.5 }}>Confidence: {(payload[0].payload.confidence?.[level] * 100 || 0).toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      width: "100%",
      height: 350,
      minWidth: 300,
      marginTop: "20px",
      position: "relative"
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mappedData}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.6} />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <CartesianGrid
            strokeDasharray="0"
            vertical={false}
            stroke="rgba(255,255,255,0.05)"
          />

          <XAxis
            dataKey="date"
            stroke="rgba(72, 26, 72, 0.9)"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            dy={10}
            fontFamily="'Inter', sans-serif"
            fontWeight="600"
          />

          <YAxis
            domain={[0, 4]}
            ticks={[1, 2, 3]}
            tickFormatter={(value) => (value === 1 ? "LOW" : value === 2 ? "MED" : value === 3 ? "HIGH" : "")}
            stroke="rgba(72, 26, 72, 0.9)"
            fontSize={13}
            tickLine={false}
            axisLine={false}
            dx={-5}
            fontFamily="'Inter', sans-serif"
            fontWeight="600"
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: 'rgba(168, 85, 247, 0.2)', strokeWidth: 2 }}
          />

          <Area
            type="monotone"
            dataKey="numericLevel"
            stroke="#a855f7"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorStress)"
            animationDuration={2000}
            dot={{
              r: 6,
              fill: "#1e1b4b",
              stroke: "#a855f7",
              strokeWidth: 3,
              filter: "url(#glow)"
            }}
            activeDot={{
              r: 8,
              fill: "#fff",
              stroke: "#a855f7",
              strokeWidth: 2,
              filter: "url(#glow)"
            }}
          />

          {/* Background Level Regions */}
          <ReferenceLine y={1} stroke="rgba(0, 255, 136, 0.05)" strokeDasharray="3 3" />
          <ReferenceLine y={2} stroke="rgba(255, 165, 0, 0.05)" strokeDasharray="3 3" />
          <ReferenceLine y={3} stroke="rgba(255, 77, 77, 0.05)" strokeDasharray="3 3" />

        </AreaChart>
      </ResponsiveContainer>

      {/* Aesthetic Overlay Label */}
      <div style={{
        position: "absolute",
        top: 0,
        right: 30,
        fontSize: "10px",
        color: "rgba(255,255,255,0.2)",
        letterSpacing: "2px",
        fontWeight: "bold",
        textTransform: "uppercase"
      }}>
        Biometric Trends
      </div>
    </div>
  );
};

export default LineChartComponent;
