## Data Science Performance Dashboard

This project delivers an interactive decision science control center built with Next.js (App Router) and Recharts. Explore revenue, profit, unit velocity, channel efficiency, and customer sentiment using synthetic data that mirrors a multi-region SaaS portfolio.

### Highlights

- KPI ribbon with auto-generated deltas for the current filter context
- Multi-metric trend visual layering revenue, profit, and units
- Product, regional, and channel breakdown visuals tuned for comparative analysis
- Satisfaction scatter connecting customer experience to revenue share
- Insight stream that narrates the most important takeaways for quick alignment

### Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the dashboard. Adjust region and product filters to reshape the analytics.

### Build & Deploy

```bash
npm run lint
npm run build
```

The app is ready for zero-config deployment on Vercel (`vercel deploy --prod`). Update `VERCEL_TOKEN` in your environment before deploying.
