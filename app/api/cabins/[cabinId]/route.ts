import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

type CabinId = {
  cabinId: number;
};

type Params = {
  params: CabinId;
};

export async function GET(_request: Request, { params }: Params) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

//POST, PUT, PATCH, DELETE, HEAD, OPTIONS...
