"use client";

import Filters from "@/components/Filters/Filters";
import CarList from "@/components/CarList/CarList";
import { getCars, getBrands } from "@/lib/api/api";
import { useState, useEffect } from "react";

import { useCarsStore } from "@/lib/store/useCarsStore";

export default function Catalog() {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const { cars, page, filters, setCars, addCars, setPage, totalCars } =
    useCarsStore();

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await getBrands();
      setBrands(res);
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      const res = await getCars(page, filters);

      if (page === 1) {
        // при першій сторінці оновлюємо cars і totalCars
        setCars(res.cars, res.totalCars);
      } else {
        // додаємо до існуючих
        addCars(res.cars, res.totalCars);
        console.log(res.cars);
      }
      setLoading(false);
    };

    fetchCars();
  }, [page, filters, setCars, addCars]);
  return (
    <>
      <Filters brands={brands} />
      <CarList cars={cars} />
      {!loading && cars.length > 0 && cars.length < totalCars && (
        <button onClick={() => setPage(page + 1)}>Load more</button>
      )}
    </>
  );
}
