import { getCarById } from "@/lib/api/api";
import { Car } from "@/types/car";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params;

  const car: Car = await getCarById(id);

  return (
    <div>
      <h1>
        {car.brand} {car.model}
      </h1>
      <p>
        <strong>Price:</strong> ${car.rentalPrice} per day
      </p>
      <p>
        <strong>Mileage:</strong> {car.mileage} km
      </p>
      <p>
        <strong>Year:</strong> {car.year}
      </p>

      <p>
        <strong>Description:</strong> {car.description}
      </p>

      <Image
        width={640}
        height={512}
        src={car.img}
        alt={`${car.brand} ${car.model}`}
      />
    </div>
  );
}
