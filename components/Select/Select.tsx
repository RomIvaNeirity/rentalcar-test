"use client";

import Select, { SingleValue } from "react-select";
import css from "./Select.module.css";

type BrandOption = {
  value: string;
  label: string;
};

type BrandSelectProps = {
  brands: string[];
  brand: string;
  setBrand: (value: string) => void;
};

type PriceSelectProps = {
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
};

export function BrandSelect({ brands, brand, setBrand }: BrandSelectProps) {
  const options = brands.map((b) => ({
    value: b,
    label: b,
  }));

  const handleChange = (option: SingleValue<BrandOption>) => {
    setBrand(option?.value || "");
  };

  return (
    <Select
      instanceId="brand-select"
      options={options}
      value={options.find((o) => o.value === brand) || null}
      onChange={handleChange}
      placeholder="Choose a brand"
      unstyled
      classNames={{
        control: () => css.selectControl,
        menu: () => css.selectMenu,
        menuList: () => css.brandMenuList,
        option: () => css.selectOption,
        placeholder: () => css.selectPlaceholder,
      }}
    />
  );
}

export function PriceSelect({ price, setPrice }: PriceSelectProps) {
  const options = Array.from({ length: 18 }, (_, i) => {
    const value = (i + 1) * 10;

    return {
      value: value.toString(),
      label: `${value}`,
    };
  });

  return (
    <Select
      instanceId="price-select"
      options={options}
      value={options.find((o) => o.value === price) || null}
      onChange={(option) => setPrice(option?.value || "")}
      placeholder="Choose a price"
      unstyled
      classNames={{
        control: () => css.selectControl,
        menu: () => css.selectMenu,
        option: () => css.selectOption,
        placeholder: () => css.selectPlaceholder,
        menuList: () => css.priceMenuList,
        dropdownIndicator: () => css.selectIndicator,
      }}
      formatOptionLabel={(option, { context }) => {
        if (context === "value") {
          return `To $${option.label}`;
        }
        return option.label;
      }}
    />
  );
}
