"use client";

import "react-day-picker/style.css";
import "@/app/_styles/globals.css";

import { isWithinInterval } from "date-fns";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import type { PropsBase } from "react-day-picker";
import { Cabin } from "@/app/types/cabin";
import { Settings } from "@/app/types/settings";

interface DateSelectorProps {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
}

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }: DateSelectorProps) {
  const defaultClassNames = getDefaultClassNames();
  const today = new Date();
  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;
  const range = { from: null, to: null };

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-6 place-self-center"
        mode="range"
        classNames={{}}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(2028, 11)}
        captionLayout="dropdown"
        showOutsideDays
        disabled={{ before: today }}
        // numberOfMonths={2}
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

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
