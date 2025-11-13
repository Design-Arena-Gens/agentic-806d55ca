"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { MetricCard } from "../components/MetricCard";
import { TrendChart } from "../components/TrendChart";
import { BreakdownChart } from "../components/BreakdownChart";
import { SatisfactionScatter } from "../components/SatisfactionScatter";
import { InsightsPanel } from "../components/InsightsPanel";
import { products, regions, sales } from "../data/sales";
import {
  buildBreakdown,
  buildSatisfaction,
  buildTimeSeries,
  computeKPIs,
  generateInsights,
} from "../lib/analytics";

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState<(typeof regions)[number] | "All">("All");
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | "All">("All");

  const filtered = useMemo(
    () =>
      sales.filter((record) => {
        if (selectedRegion !== "All" && record.region !== selectedRegion) return false;
        if (selectedProduct !== "All" && record.product !== selectedProduct) return false;
        return true;
      }),
    [selectedRegion, selectedProduct],
  );

  const kpis = useMemo(() => computeKPIs(filtered), [filtered]);
  const timeSeries = useMemo(
    () =>
      buildTimeSeries(
        sales,
        selectedRegion === "All" ? undefined : selectedRegion,
        selectedProduct === "All" ? undefined : selectedProduct,
      ),
    [selectedRegion, selectedProduct],
  );
  const productBreakdown = useMemo(
    () =>
      buildBreakdown(
        sales,
        "product",
        selectedRegion === "All" ? undefined : selectedRegion,
        undefined,
      ),
    [selectedRegion],
  );
  const regionBreakdown = useMemo(
    () =>
      buildBreakdown(
        sales,
        "region",
        undefined,
        selectedProduct === "All" ? undefined : selectedProduct,
      ),
    [selectedProduct],
  );
  const channelBreakdown = useMemo(
    () =>
      buildBreakdown(
        sales,
        "channel",
        selectedRegion === "All" ? undefined : selectedRegion,
        selectedProduct === "All" ? undefined : selectedProduct,
      ),
    [selectedRegion, selectedProduct],
  );
  const satisfaction = useMemo(
    () =>
      buildSatisfaction(
        sales,
        selectedRegion === "All" ? undefined : selectedRegion,
        selectedProduct === "All" ? undefined : selectedProduct,
      ),
    [selectedRegion, selectedProduct],
  );
  const insights = useMemo(
    () =>
      generateInsights(
        sales,
        selectedRegion === "All" ? undefined : selectedRegion,
        selectedProduct === "All" ? undefined : selectedProduct,
      ),
    [selectedRegion, selectedProduct],
  );

  return (
    <main className="min-h-screen bg-slate-100 pb-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pt-12">
        <header className="flex flex-col gap-4">
          <span className="w-fit rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-xs font-medium uppercase tracking-widest text-indigo-600">
            DS Command Center
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Data Science Performance Dashboard
          </h1>
          <p className="max-w-3xl text-sm text-slate-600">
            Monitor portfolio-level performance across regions, product lines, and go-to-market
            channels. The dashboard highlights revenue momentum, profitability, and customer
            satisfaction to inform your next strategic move.
          </p>
        </header>

        <FilterBar
          region={selectedRegion}
          setRegion={setSelectedRegion}
          product={selectedProduct}
          setProduct={setSelectedProduct}
          regions={regions}
          products={products}
        />

        <section className="grid gap-4 lg:grid-cols-5">
          {kpis.map((kpi) => (
            <MetricCard key={kpi.label} label={kpi.label} value={kpi.value} change={kpi.change} />
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Revenue & Profit Velocity</h2>
                <p className="text-sm text-slate-500">
                  Overlay revenue, profit, and unit volume to spot inflection points.
                </p>
              </div>
              <div className="rounded-full border border-slate-200 bg-white px-4 py-1 text-xs text-slate-500">
                Period: Jan - Jun 2024
              </div>
            </div>
            <div className="mt-6">
              <TrendChart data={timeSeries} />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
            <h2 className="text-lg font-semibold text-slate-900">AI Insight Stream</h2>
            <p className="text-sm text-slate-500">
              Signals derived from current filters and historical trends.
            </p>
            <div className="mt-4 h-[22rem]">
              <InsightsPanel insights={insights} />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
            <h2 className="text-lg font-semibold text-slate-900">Product Mix Impact</h2>
            <p className="text-sm text-slate-500">
              Evaluate the revenue and profit contribution of each product line.
            </p>
            <div className="mt-6">
              <BreakdownChart data={productBreakdown} title="Product contribution (global view)" />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
            <h2 className="text-lg font-semibold text-slate-900">Regional Performance</h2>
            <p className="text-sm text-slate-500">
              Surface the regions fueling momentum for the selected perspective.
            </p>
            <div className="mt-6">
              <BreakdownChart data={regionBreakdown} title="Regional view of current focus" />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
            <h2 className="text-lg font-semibold text-slate-900">Channel Profitability</h2>
            <p className="text-sm text-slate-500">
              Compare direct and partner motions to rebalance investments.
            </p>
            <div className="mt-6">
              <BreakdownChart data={channelBreakdown} title="Go-to-market efficiency" />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
            <h2 className="text-lg font-semibold text-slate-900">Experience vs. Revenue</h2>
            <p className="text-sm text-slate-500">
              Explore how customer sentiment aligns with revenue share by product drop.
            </p>
            <div className="mt-6">
              <SatisfactionScatter data={satisfaction} />
            </div>
          </div>
        </section>

        <footer className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-slate-200 shadow-sm shadow-slate-900/30">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-50">Decision science at a glance</h2>
              <p className="text-sm text-slate-400">
                Use this dashboard as the launchpad for scenario planning, forecasting, and deeper
                experimentation.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="rounded-full border border-indigo-300 bg-indigo-500 px-5 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-900/40 transition hover:bg-indigo-600">
                Export snapshot
              </button>
              <button className="rounded-full border border-slate-700 px-5 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800">
                Launch scenario
              </button>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
