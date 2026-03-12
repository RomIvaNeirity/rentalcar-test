export interface Car {
  accessories: string[];
  address: string;
  brand: string;
  description: string;
  engineSize: string;
  fuelConsumption: string;
  functionalities: string[];
  id: string;
  img: string;
  mileage: number;
  model: string;
  rentalCompany: string;
  rentalConditions: string[];
  rentalPrice: [];
  type: string;
  year: number;
}

export type CarFilters = {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
};
