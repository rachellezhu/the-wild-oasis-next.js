"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "@/app/_hooks/useReservation";

export default function ReservationReminder() {
  const { range, resetRange } = useReservation();
  if (!range || !range.from || !range.to) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-8 rounded-full bg-accent-500 text-primary-800 font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center">
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br />
        from&nbsp;{format(new Date(range.from), "MMM dd yyyy")}&nbsp;to&nbsp;
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>

      <button
        className="rounded-full p-1 hover:bg-accent-600 transition-all"
        onClick={resetRange}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
