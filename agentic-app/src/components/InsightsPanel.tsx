type InsightsPanelProps = {
  insights: string[];
};

export function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-slate-50 shadow-sm shadow-slate-900/30">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400">
          Analyst Notes
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight">
          AI-generated insights
        </h2>
      </div>
      <ul className="flex flex-1 flex-col gap-3">
        {insights.map((insight, index) => (
          <li key={index} className="rounded-xl bg-slate-800/60 p-4 text-sm leading-relaxed">
            {insight}
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-400">
        Trends are generated from the synthetic dataset for demonstration purposes.
      </p>
    </div>
  );
}
