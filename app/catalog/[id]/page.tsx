import { getCarById } from "@/lib/api/api";
import { Car } from "@/types/car";
import Image from "next/image";
import css from "./page.module.css";
import BookingForm from "@/components/BookingForm/BookingForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params;

  const car: Car = await getCarById(id);

  const parts = car.address.split(",");
  const city = parts[1].trim();
  const country = parts[2].trim();

  return (
    <div className={css.carDetailGrid}>
      <div className={`${css.carDetailsImageContainer} ${css.topLeft}`}>
        <Image
          width={640}
          height={512}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
        />
      </div>
      <div className={`${css.carDetailsFormContainer} ${css.bottomLeft}`}>
        <h2 className={css.carDetailsFormTitle}>Book your car now</h2>
        <h3 className={css.carDetailsFormSubTitle}>
          Stay connected! We are always ready to help you.
        </h3>
        <BookingForm />
      </div>
      <div className={`${css.carDetailsLists} ${css.right}`}>
        <div className={css.carDetailsHeader}>
          <h1 className={css.carDetailsPageTitle}>
            {car.brand} {car.model}, {car.year}
          </h1>
          <div className={css.carDetailsText}>
            <svg width="16" height="16" className={css.carDetailsIcons}>
              <use href="/icons.svg#icon-Location" />
            </svg>
            <span className={css.carDetailsLocation}>
              {city}, {country}
            </span>
            <span>Mileage: {car.mileage.toLocaleString("uk-UA")} km</span>
          </div>
          <span className={css.carDetailsPrise}>$ {car.rentalPrice}</span>
          <p className={css.carDetailsText}>{car.description}</p>
        </div>
        <h2 className={css.carDetailsSubTitle}>Rental Conditions:</h2>
        <ul className={css.carDetailsList}>
          {car.rentalConditions.map((r) => (
            <li
              key={r}
              className={`${css.carDetailsListItem} ${css.carDetailsText}`}
            >
              <svg width="16" height="16" className={css.carDetailsIcons}>
                <use href="/icons.svg#icon-check-circle" />
              </svg>
              {r}
            </li>
          ))}
        </ul>
        <h2 className={css.carDetailsSubTitle}>Car Specifications:</h2>
        <ul className={css.carDetailsList}>
          <li className={`${css.carDetailsListItem} ${css.carDetailsText}`}>
            <svg width="16" height="16" className={css.carDetailsIcons}>
              <use href="/icons.svg#icon-calendar" />
            </svg>
            Year: {car.year}
          </li>
          <li className={`${css.carDetailsListItem} ${css.carDetailsText}`}>
            <svg width="16" height="16" className={css.carDetailsIcons}>
              <use href="/icons.svg#icon-car" />
            </svg>
            Type: {car.type}
          </li>
          <li className={`${css.carDetailsListItem} ${css.carDetailsText}`}>
            <svg width="16" height="16" className={css.carDetailsIcons}>
              <use href="/icons.svg#icon-fuel-pump" />
            </svg>
            Fuel Consumption: {car.fuelConsumption}
          </li>
          <li className={`${css.carDetailsListItem} ${css.carDetailsText}`}>
            <svg width="16" height="16" className={css.carDetailsIcons}>
              <use href="/icons.svg#icon-gear" />
            </svg>
            Engine Size: {car.engineSize}
          </li>
        </ul>

        <h2 className={css.carDetailsSubTitle}>
          Accessories and functionalities:
        </h2>
        <ul className={css.carDetailsList}>
          {car.accessories.map((a) => (
            <li
              key={a}
              className={`${css.carDetailsListItem} ${css.carDetailsText}`}
            >
              <svg width="16" height="16" className={css.carDetailsIcons}>
                <use href="/icons.svg#icon-check-circle" />
              </svg>
              {a}
            </li>
          ))}
          {car.functionalities.map((f) => (
            <li
              key={f}
              className={`${css.carDetailsListItem} ${css.carDetailsText}`}
            >
              <svg width="16" height="16" className={css.carDetailsIcons}>
                <use href="/icons.svg#icon-check-circle" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
