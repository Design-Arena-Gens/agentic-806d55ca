import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ZAxis,
} from "recharts";
import type { SatisfactionPoint } from "../lib/analytics";

type SatisfactionScatterProps = {
  data: SatisfactionPoint[];
};

export function SatisfactionScatter({ data }: SatisfactionScatterProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="revenueShare"
            name="Revenue Share"
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            stroke="#475569"
          />
          <YAxis
            type="number"
            dataKey="satisfaction"
            name="Satisfaction"
            domain={[3, 5]}
            stroke="#475569"
          />
          <ZAxis type="number" dataKey="satisfaction" range={[80, 200]} />
          <Tooltip
            formatter={(value: number, name, { payload }) => {
              if (name === "revenueShare") {
                return [`${(value * 100).toFixed(1)}%`, "Revenue Share"];
              }
              if (name === "satisfaction") {
                return [value.toFixed(1), "Satisfaction"];
              }
              return [value, name];
            }}
            labelFormatter={(_, payload) => payload?.[0]?.name ?? ""}
          />
          <Scatter data={data} name="Satisfaction" fill="#f97316" />
        </ScatterChart>
      </ResponsiveContainer>
      <p className="mt-3 text-center text-sm text-slate-500">
        Customer satisfaction plotted against revenue share
      </p>
    </div>
  );
}
