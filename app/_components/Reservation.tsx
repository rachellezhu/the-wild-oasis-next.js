import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getSettings } from "@/app/_lib/setting-services";
import { getBookedDatesByCabinId } from "@/app/_lib/booking-services";
import { TCabin } from "@/app/_types/cabin-type";

export default async function Reservation({ cabin }: { cabin: TCabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div>
      <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
        <DateSelector
          settings={settings}
          bookedDates={bookedDates}
          cabin={cabin}
        />
        <ReservationForm cabin={cabin} />
      </div>
    </div>
  );
}
