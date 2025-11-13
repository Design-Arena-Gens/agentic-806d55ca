import type { Dispatch, SetStateAction } from "react";
import type { SaleRecord } from "../data/sales";

type FilterBarProps = {
  region: SaleRecord["region"] | "All";
  setRegion: Dispatch<SetStateAction<SaleRecord["region"] | "All">>;
  product: SaleRecord["product"] | "All";
  setProduct: Dispatch<SetStateAction<SaleRecord["product"] | "All">>;
  regions: readonly SaleRecord["region"][];
  products: readonly SaleRecord["product"][];
};

export function FilterBar({
  region,
  setRegion,
  product,
  setProduct,
  regions,
  products,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/40">
      <FilterSelect
        label="Region"
        value={region}
        onChange={(value) => setRegion(value as FilterBarProps["region"])}
        options={["All", ...regions]}
      />
      <FilterSelect
        label="Product"
        value={product}
        onChange={(value) => setProduct(value as FilterBarProps["product"])}
        options={["All", ...products]}
      />
    </div>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
};

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="flex flex-col text-sm font-medium text-slate-600">
      {label}
      <select
        className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
