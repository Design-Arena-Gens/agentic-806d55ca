import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import type { BreakdownPoint } from "../lib/analytics";

type BreakdownChartProps = {
  data: BreakdownPoint[];
  title: string;
};

export function BreakdownChart({ data, title }: BreakdownChartProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, bottom: 10, left: 80 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            type="number"
            stroke="#475569"
            tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
          />
          <YAxis type="category" dataKey="name" stroke="#475569" width={120} />
          <Tooltip
            formatter={(value: number, name) => [
              `$${value.toLocaleString()}`,
              name === "profit" ? "Profit" : name === "revenue" ? "Revenue" : "Units",
            ]}
          />
          <Legend />
          <Bar dataKey="revenue" fill="#4338ca" radius={[0, 8, 8, 0]} name="Revenue" />
          <Bar dataKey="profit" fill="#0f766e" radius={[0, 8, 8, 0]} name="Profit" />
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-3 text-center text-sm text-slate-500">{title}</p>
    </div>
  );
}
