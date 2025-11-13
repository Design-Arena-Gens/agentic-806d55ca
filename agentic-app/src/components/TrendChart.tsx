import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  Bar,
} from "recharts";
import type { TimeSeriesPoint } from "../lib/analytics";

type TrendChartProps = {
  data: TimeSeriesPoint[];
};

export function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#475569" />
          <YAxis
            yAxisId="left"
            stroke="#475569"
            tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#475569"
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            formatter={(value: number, name) => {
              if (name === "units") return [value.toLocaleString(), "Units"];
              return [`$${value.toLocaleString()}`, name === "profit" ? "Profit" : "Revenue"];
            }}
          />
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            fill="#4338ca20"
            stroke="#4338ca"
            strokeWidth={2}
            name="Revenue"
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="profit"
            fill="#0f766e20"
            stroke="#0f766e"
            strokeWidth={2}
            name="Profit"
          />
          <Bar
            yAxisId="right"
            dataKey="units"
            fill="#f97316"
            radius={[6, 6, 0, 0]}
            name="Units"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
