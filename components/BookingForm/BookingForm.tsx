"use client";

import { useEffect } from "react";
import { showSuccessToast } from "@/lib/Izitoast";
import css from "./BookingForm.module.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";

export default function BookingForm() {
  useEffect(() => {
    flatpickr("#myID", {
      dateFormat: "d-m-Y",
      monthSelectorType: "static",
      disableMobile: true,
      weekNumbers: false,
      locale: {
        firstDayOfWeek: 1,
      },
    });
  }, []);

  const handleSubmit = (formData: FormData) => {
    const userName = formData.get("name");
    const userMail = formData.get("email");
    const bookingDate = formData.get("date");
    const bookingComment = formData.get("comment");

    console.log("User:", userName, userMail, bookingDate, bookingComment);

    showSuccessToast(
      `${userName}, Your rental booking is success${
        bookingDate ? ` on ${bookingDate}` : ""
      }`,
    );
  };

  return (
    <form action={handleSubmit}>
      <label>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          required
          className={css.bookingFormInput}
        ></input>
      </label>
      <label>
        <input
          type="email"
          name="email"
          placeholder="Email*"
          required
          className={css.bookingFormInput}
        ></input>
      </label>
      <label>
        <input
          id="myID"
          type="text"
          name="date"
          placeholder="Booking date"
          className={css.bookingFormInput}
        ></input>
      </label>
      <label>
        <textarea
          placeholder="Comment"
          name="comment"
          className={css.bookingFormTextarea}
        ></textarea>
      </label>
      <button type="submit" className={css.bookingFormButton}>
        Send
      </button>
    </form>
  );
}
