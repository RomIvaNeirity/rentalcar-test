"use client";

import Filters from "@/components/Filters/Filters";
import CarList from "@/components/CarList/CarList";
import { getCars, getBrands } from "@/lib/api/api";
import { useState, useEffect } from "react";

import { useCarsStore } from "@/lib/store/useCarsStore";
import { showInfoToast } from "@/lib/Izitoast";

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
      try {
        // LOADING
        const res = await getCars(page, filters);

        if (res.cars.length === 0 && page === 1) {
          showInfoToast(
            "Unfortunately, no cars match your filters. You can reset it",
          );
        }

        if (page === 1) {
          setCars(res.cars, res.totalCars);
        } else {
          addCars(res.cars, res.totalCars);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [page, filters, setCars, addCars]);
  return (
    <>
      <Filters brands={brands} />
      <CarList
        cars={cars}
        loading={loading}
        totalCars={totalCars}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
