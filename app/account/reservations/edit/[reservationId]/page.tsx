import EditReservationForm from "@/app/_components/EditReservationForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";

type ReservationId = {
  reservationId: number;
};

interface PageProps {
  params: ReservationId;
}

export default async function Page({ params }: PageProps) {
  const reservation = await getBooking(params.reservationId);
  const { maxCapacity } = await getCabin(reservation.cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservation.id}
      </h2>
      <EditReservationForm
        reservation={reservation}
        maxCapacity={maxCapacity}
      />
    </div>
  );
}
