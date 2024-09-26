"use client";

import "@/app/_styles/globals.css";
import "react-day-picker/style.css";

import { Cabin } from "@/app/types/cabin";
import { Settings } from "@/app/types/settings";
import { differenceInDays, isWithinInterval } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { useReservation } from "./ReservationContext";

interface DateSelectorProps {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
}

function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]) {
  return (
    range?.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, {
        start: range.from as Date,
        end: range.to as Date,
      })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();
  const displayRange: DateRange | null | undefined = isAlreadyBooked(
    range,
    bookedDates
  )
    ? null
    : range;

  const today = new Date();
  const { regularPrice, discount } = cabin;

  const numNights =
    !displayRange?.from || !displayRange?.to
      ? 0
      : differenceInDays(displayRange.to, displayRange.from);

  const cabinPrice = numNights * (regularPrice - discount);
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-8 place-self-center"
        mode="range"
        onSelect={setRange}
        selected={displayRange as DateRange}
        min={minBookingLength}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(2028, 11)}
        captionLayout="dropdown"
        showOutsideDays
        disabled={[{ before: today }, ...Object.values(bookedDates)]}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
