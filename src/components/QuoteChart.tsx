
import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuoteChartProps {
  type: "area" | "bar" | "line";
  data: any[];
  title: string;
  className?: string;
  xKey: string;
  yKeys: {
    key: string;
    name: string;
    color: string;
  }[];
  height?: number;
  showGridLines?: boolean;
  formatYAxis?: (value: number) => string;
}

const QuoteChart: React.FC<QuoteChartProps> = ({
  type,
  data,
  title,
  className,
  xKey,
  yKeys,
  height = 300,
  showGridLines = true,
  formatYAxis = (value) => `$${value.toLocaleString()}`,
}) => {
  const renderTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium text-sm mb-2 text-gray-800">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={`tooltip-${index}`}
              className="text-sm flex items-center justify-between gap-4"
            >
              <span className="flex items-center">
                <span 
                  className="h-3 w-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span style={{ color: entry.color }}>{entry.name}:</span>
              </span>
              <span className="font-medium">
                {typeof entry.value === "number"
                  ? `$${entry.value.toLocaleString()}`
                  : entry.value}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const chartProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 10 },
    };

    switch (type) {
      case "area":
        return (
          <AreaChart {...chartProps}>
            {showGridLines && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#f1f5f9" 
                strokeWidth={1.5}
              />
            )}
            <defs>
              {yKeys.map((item, index) => (
                <linearGradient 
                  key={`gradient-${item.key}`} 
                  id={`color-${item.key}`} 
                  x1="0" 
                  y1="0" 
                  x2="0" 
                  y2="1"
                >
                  <stop 
                    offset="5%" 
                    stopColor={item.color} 
                    stopOpacity={0.8}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={item.color} 
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <XAxis 
              dataKey={xKey} 
              tick={{ fontSize: 12, fill: "#64748b" }} 
              tickLine={{ stroke: "#cbd5e1" }}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis 
              width={60} 
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={{ stroke: "#cbd5e1" }}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <Tooltip content={renderTooltip} />
            <Legend 
              wrapperStyle={{ paddingTop: 15 }}
              iconType="circle"
            />
            {yKeys.map((item) => (
              <Area
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.name}
                stroke={item.color}
                strokeWidth={3}
                fill={`url(#color-${item.key})`}
                activeDot={{ r: 8, strokeWidth: 0, fill: item.color }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            ))}
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart {...chartProps}>
            {showGridLines && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#f1f5f9" 
                strokeWidth={1.5}
              />
            )}
            <XAxis 
              dataKey={xKey} 
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={{ stroke: "#cbd5e1" }}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis 
              width={60} 
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={{ stroke: "#cbd5e1" }}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <Tooltip content={renderTooltip} />
            <Legend 
              wrapperStyle={{ paddingTop: 15 }}
              iconType="circle"
            />
            {yKeys.map((item, index) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                name={item.name}
                fill={item.color}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationEasing="ease-in-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={item.color}
                    fillOpacity={0.9}
                    stroke={item.color}
                    strokeWidth={1}
                  />
                ))}
              </Bar>
            ))}
          </BarChart>
        );
      case "line":
        return (
          <LineChart {...chartProps}>
            {showGridLines && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#f1f5f9" 
                strokeWidth={1.5}
              />
            )}
            <XAxis 
              dataKey={xKey} 
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={{ stroke: "#cbd5e1" }}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis 
              width={60} 
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={{ stroke: "#cbd5e1" }}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <Tooltip content={renderTooltip} />
            <Legend 
              wrapperStyle={{ paddingTop: 15 }}
              iconType="circle"
            />
            {yKeys.map((item) => (
              <Line
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.name}
                stroke={item.color}
                strokeWidth={3}
                dot={{ r: 6, fill: item.color, strokeWidth: 3, stroke: "white" }}
                activeDot={{ r: 8, strokeWidth: 0, fill: item.color }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            ))}
          </LineChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={cn("overflow-hidden h-full bg-white", className)}>
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-slate-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-full w-full p-4">
          <ResponsiveContainer width="100%" height={height}>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteChart;
