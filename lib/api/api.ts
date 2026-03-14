import axios from "axios";
import { Car, CarFilters } from "@/types/car";

type CarListResponse = {
  cars: Car[];
  totalCars: number;
};

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const getCars = async (page: number, filters: CarFilters = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "12",
  });

  if (filters.brand) {
    params.append("brand", filters.brand);
  }

  if (filters.rentalPrice) {
    params.append("rentalPrice", filters.rentalPrice);
  }

  if (filters.minMileage) {
    const cleanMinMileage = filters.minMileage.replace(/,/g, "");
    params.append("minMileage", cleanMinMileage);
  }

  if (filters.maxMileage) {
    const cleanMaxMileage = filters.maxMileage.replace(/,/g, "");
    params.append("maxMileage", cleanMaxMileage);
  }

  const res = await axios.get<CarListResponse>(`/cars?${params}`);

  return res.data;
};

export const getBrands = async () => {
  const res = await axios.get<string[]>("/brands");
  return res.data;
};

export const getCarById = async (id: string) => {
  const res = await axios.get(`/cars/${id}`);

  return res.data;
};
