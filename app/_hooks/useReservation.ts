import { useContext } from "react";
import { ReservationContext } from "@/app/_components/ReservationContext";

export function useReservation() {
  const context = useContext(ReservationContext);

  if (context === undefined)
    throw new Error("Context was used outside provider");

  return context;
}
