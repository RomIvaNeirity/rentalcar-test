import { Car } from "@/types/car";
import CarCard from "../CarCard/CarCard";
import css from "./CarList.module.css";

type Props = {
  cars: Car[];
  loading: boolean;
  totalCars: number;
  page: number;
  setPage: (page: number) => void;
};

export default function CarList({
  cars,
  loading,
  totalCars,
  page,
  setPage,
}: Props) {
  return (
    <section className={css.sectionCarList}>
      <ul className={css.carList}>
        {cars.map((car) => (
          <CarCard key={car.id} item={car} />
        ))}
      </ul>

      {/* NEW — кнопка Load More перенесена сюди */}
      {!loading && cars.length > 0 && cars.length < totalCars && (
        <div className={css.loadMoreButtonContainer}>
          <button
            className={css.loadMoreButton}
            onClick={() => setPage(page + 1)}
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
}
