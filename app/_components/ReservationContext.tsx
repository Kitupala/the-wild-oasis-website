"use client";

import { createContext, useContext, useState } from "react";
import type { DateRange } from "react-day-picker";

const initialState: DateRange | undefined = undefined;

const ReservationContext = createContext<
  | {
      range: DateRange | undefined;
      setRange: (range: DateRange | undefined) => void;
      resetRange: () => void;
    }
  | undefined
>(undefined);

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  const resetRange = () => setRange({ from: undefined, to: undefined });

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside of provider");
  return context;
}

export { ReservationProvider, useReservation };
