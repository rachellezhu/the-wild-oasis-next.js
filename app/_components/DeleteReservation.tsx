"use client";

import SpinnerMini from "@/app/_components/SpinnerMini";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";

export default function DeleteReservation({
  bookingId,
  onDelete,
}: {
  bookingId: number;
  onDelete: (bookingId: number) => void;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(bookingId: number) {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      onClick={() => handleDelete(bookingId)}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      disabled={isPending}
    >
      {isPending ? (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      ) : (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      )}
    </button>
  );
}
