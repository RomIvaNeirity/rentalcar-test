import { Car } from "@/types/car";
import Image from "next/image";
import Link from "next/link";
import { useCarsStore } from "@/lib/store/useCarsStore";
import css from "./CarCard.module.css";

type Props = {
  item: Car;
};

export default function CarCard({ item }: Props) {
  const parts = item.address.split(",");
  const city = parts[1].trim();
  const country = parts[2].trim();

  const { favorites, toggleFavorite } = useCarsStore();

  const isFavorite = favorites.includes(item.id);

  return (
    <li className={css.carCard}>
      <div className={css.cardImageContainer}>
        <svg
          width="16"
          height="16"
          className={css.favoriteButton}
          onClick={() => toggleFavorite(item.id)}
        >
          <use
            href={
              isFavorite
                ? "/icons.svg#icon-favorite-active"
                : "/icons.svg#icon-favorite-default"
            }
          />
        </svg>

        <Image src={item.img} width={400} height={268} alt={item.model} />
      </div>
      <div className={css.cardFHeader}>
        <span>
          {item.brand}
          <span className={css.itemModel}> {item.model}</span>, {item.year}
        </span>
        <span>$ {item.rentalPrice}</span>
      </div>
      <div className={css.carDetailsContainer}>
        <span className={css.carDetails}>
          <span>{city}</span>
          <span>{country}</span>
          <span>{item.rentalCompany}</span>
        </span>
        <span className={css.carDetails}>
          <span>{item.type}</span>
          <span>{item.mileage}</span>
        </span>
      </div>
      <Link href={`/catalog/${item.id}`} className={css.carCardButton}>
        Read more
      </Link>
    </li>
  );
}
