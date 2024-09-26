interface CabinSummary {
  name: string;
  image: string;
}

export interface Booking {
  id: number;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  cabins: CabinSummary;
  observations?: string;
}

export interface BookingData {
  startDate: string | null;
  endDate: string | null;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
}
