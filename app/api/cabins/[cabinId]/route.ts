import { getBookedDatesByCabinId } from "@/app/_lib/booking-services";
import { getCabin } from "@/app/_lib/cabin-services";

export async function GET(
  request: Request,
  { params }: { params: { cabinId: string } },
) {
  const { cabinId } = params;

  console.log(request);

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(Number(cabinId)),
      getBookedDatesByCabinId(Number(cabinId)),
    ]);

    return Response.json({ data: { cabin, bookedDates } });
  } catch {
    return Response.json({
      error: {
        message: "Cabin not found",
      },
    });
  }
}
