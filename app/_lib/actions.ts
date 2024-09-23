// Module to define and export server actions
"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
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

  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
