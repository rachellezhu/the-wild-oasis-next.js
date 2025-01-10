import { getBookedDatesByCabinId } from "@/app/_lib/booking-services";
import { getCabin } from "@/app/_lib/cabin-services";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cabinId: string }> }
) {
  const { cabinId } = await params;

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
