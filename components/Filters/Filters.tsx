"use client";

import { useState } from "react";
import css from "./Filters.module.css";
import { useCarsStore } from "@/lib/store/useCarsStore";
import { BrandSelect, PriceSelect } from "../Select/Select";

type FiltersProps = {
  brands: string[];
};

export default function Filters({ brands }: FiltersProps) {
  const setFilters = useCarsStore((state) => state.setFilters);
  const cars = useCarsStore((state) => state.cars);

  //перевірка наявності значень у фільтрах
  const filters = useCarsStore((state) => state.filters);
  const hasActiveFilters =
    filters.brand ||
    filters.rentalPrice ||
    filters.minMileage ||
    filters.maxMileage;
  //

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const formatNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
    <>
      <div className={css.filtersWrapper}>
        <form className={css.filtersForm} onSubmit={handleSubmit}>
          {/* BRAND */}
          <label className={css.labelsFilters}>
            Car brand
            <BrandSelect brands={brands} brand={brand} setBrand={setBrand} />
          </label>

          {/* PRICE */}
          <label className={css.labelsFilters}>
            Price / 1 hour
            <PriceSelect price={price} setPrice={setPrice} />
          </label>

          {/* MILEAGE FROM */}
          <label className={css.labelFilterMileage}>
            Сar mileage / km
            <div className={css.filterInputsWrapper}>
              <div className={css.filterInputFromWrapper}>
                <span className={css.inputPseudoPlaceholder}>From</span>
                <input
                  type="text"
                  value={minMileage}
                  onChange={(e) => setMinMileage(formatNumber(e.target.value))}
                  className={css.filterMileageFromInput}
                />
              </div>
              <div className={css.filterInputFromWrapper}>
                <span className={css.inputPseudoPlaceholder}>To</span>
                {/* MILEAGE TO */}
                <input
                  type="text"
                  value={maxMileage}
                  onChange={(e) => setMaxMileage(formatNumber(e.target.value))}
                  className={css.filterMileageToInput}
                />
              </div>
            </div>
          </label>

          <button type="submit" className={css.filtersSearchButton}>
            Search
          </button>
        </form>
      </div>
      {hasActiveFilters && cars.length === 0 && (
        <button
          type="button"
          onClick={resetFilters}
          className={css.filtersResetButton}
        >
          Reset filters
        </button>
      )}
    </>
  );
}
