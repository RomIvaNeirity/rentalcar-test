import css from "./Hero.module.css";

import Link from "next/link";

export default function Hero() {
  return (
    <section className={css.hero}>
      <h1 className={css.heroTitle}>Find your perfect rental car</h1>
      <h2 className={css.heroSubTitle}>
        Reliable and budget-friendly rentals for any journey
      </h2>
      <Link href={"/catalog"} className={css.heroButton}>
        View Catalog
      </Link>
    </section>
  );
}
