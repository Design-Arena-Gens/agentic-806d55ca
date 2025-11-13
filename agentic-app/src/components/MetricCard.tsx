type MetricCardProps = {
  label: string;
  value: string;
  change: number;
};

export function MetricCard({ label, value, change }: MetricCardProps) {
  const positive = change >= 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>
      <p
        className={`mt-3 text-sm font-medium ${
          positive ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {positive ? "▲" : "▼"} {Math.abs(change).toFixed(1)}% vs. last period
      </p>
    </div>
  );
}
