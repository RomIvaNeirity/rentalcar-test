import { Car } from "@/types/car";
import CarCard from "../CarCard/CarCard";
import css from "./CarList.module.css";

type Props = {
  cars: Car[];
};

export default function CarList({ cars }: Props) {
  return (
    <section className={css.sectionCarList}>
      <ul className={css.carList}>
        {cars.map((car) => (
          <CarCard key={car.id} item={car} />
        ))}
      </ul>
    </section>
  );
}
