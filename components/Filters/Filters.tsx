"use client";

import { useState } from "react";
import css from "./Filters.module.css";
import { useCarsStore } from "@/lib/store/useCarsStore";

type FiltersProps = {
  brands: string[];
};

export default function Filters({ brands }: FiltersProps) {
  const setFilters = useCarsStore((state) => state.setFilters);

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFilters({
      brand,
      rentalPrice: price,
      minMileage,
      maxMileage,
    });
  };

  const resetFilters = () => {
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");
    setFilters({
      brand: "",
      rentalPrice: "",
      minMileage: "",
      maxMileage: "",
    });
  };

  return (
    <div className={css.filtersWrapper}>
      <form className={css.filtersForm} onSubmit={handleSubmit}>
        {/* BRAND */}
        <label className={css.labelsFilters}>
          Car brand
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className={css.labelsFilterSelects}
          >
            <option value="">Choose a brand</option>

            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>

        {/* PRICE */}
        <label className={css.labelsFilters}>
          Price/ 1 hour
          <select value={price} onChange={(e) => setPrice(e.target.value)}>
            <option value="">Choose a price</option>

            {Array.from({ length: 18 }, (_, i) => {
              const value = (i + 1) * 10;

              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </label>

        {/* MILEAGE FROM */}
        <label className={css.labelFilterMileage}>
          Сar mileage / km
          <div className={css.filterInputsWrapper}>
            {" "}
            <input
              type="number"
              placeholder="From"
              value={minMileage}
              onChange={(e) => setMinMileage(e.target.value)}
            />
            {/* MILEAGE TO */}
            <input
              type="number"
              placeholder="To"
              value={maxMileage}
              onChange={(e) => setMaxMileage(e.target.value)}
            />
          </div>
        </label>
        <button type="button" onClick={resetFilters}>
          Reset button
        </button>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
