// Module to define and export server actions
"use server";

import { BookingData } from "@/app/types/booking";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";

export async function updateGuestProfile(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to perfom this action");

  const nationalID = formData.get("nationalID") as string | null;
  const nationalityData = formData.get("nationality") as string | null;

  if (!nationalID || !nationalityData) {
    throw new Error("Missing required fields");
  }
  const [nationality, countryFlag] = nationalityData.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updatedData = { nationality, nationalID, countryFlag };

  const { error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function createReservation(
  bookingData: BookingData,
  formData: FormData
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to perfom this action");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
  };

  // Object.entries(formData.entries());

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteReservation(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to perfom this action");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function editReservation(formData: FormData) {
  const reservationId = Number(formData.get("reservationId"));

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in to perfom this action");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(reservationId))
    throw new Error("You are not allowed to update this booking");

  // 3) Build update data
  const updatedData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", reservationId);

  // 5) Error handling
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  // 6) Revalidation
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${reservationId}`);

  // 7) Redirecting
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
