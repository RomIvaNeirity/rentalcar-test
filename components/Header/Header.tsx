"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        <svg width="104" height="16">
          <use href="/icons.svg#icon-Logo" />
        </svg>
      </Link>

      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/" className={pathname === "/" ? css.activeLink : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/catalog"
              className={pathname === "/catalog" ? css.activeLink : ""}
            >
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
