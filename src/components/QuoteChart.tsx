
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
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
          <p className="font-medium text-sm mb-2">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={`tooltip-${index}`}
              className="text-sm flex items-center justify-between gap-4"
            >
              <span style={{ color: entry.color }}>{entry.name}:</span>
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
      margin: { top: 10, right: 30, left: 20, bottom: 10 },
    };

    switch (type) {
      case "area":
        return (
          <AreaChart {...chartProps}>
            {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
            <YAxis 
              width={60} 
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={renderTooltip} />
            <Legend />
            {yKeys.map((item) => (
              <Area
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.name}
                stroke={item.color}
                fill={item.color}
                fillOpacity={0.2}
                activeDot={{ r: 6 }}
                animationDuration={1500}
              />
            ))}
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart {...chartProps}>
            {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
            <YAxis 
              width={60} 
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={renderTooltip} />
            <Legend />
            {yKeys.map((item) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                name={item.name}
                fill={item.color}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            ))}
          </BarChart>
        );
      case "line":
        return (
          <LineChart {...chartProps}>
            {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
            <YAxis 
              width={60} 
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={renderTooltip} />
            <Legend />
            {yKeys.map((item) => (
              <Line
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.name}
                stroke={item.color}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={1500}
              />
            ))}
          </LineChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={cn("overflow-hidden h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height={height}>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteChart;
