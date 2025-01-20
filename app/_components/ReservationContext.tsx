"use client";

import { createContext, SetStateAction, useState } from "react";
import { DateRange } from "react-day-picker";

type TReservationContext = {
  range: DateRange | undefined;
  setRange: React.Dispatch<SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
};
export const ReservationContext = createContext<TReservationContext>({
  range: undefined,
  setRange: () => null,
  resetRange: () => null,
});

const initialState = {
  from: undefined,
  to: undefined,
};

export default function ReservationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  function resetRange() {
    setRange(initialState);
  }

  if (range?.from && !range.to) setRange({ ...range, to: range.from });

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}
