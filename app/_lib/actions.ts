"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { updateGuest } from "./guest-services";
import { revalidatePath } from "next/cache";

export async function updateGuestProfile(formData: FormData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalProp = formData.get("nationality")?.toString().split("%");
  const nationality =
    nationalProp && nationalProp.length == 2 ? nationalProp.at(0) : "";
  const countryFlag =
    nationalProp && nationalProp.length == 2 ? nationalProp.at(1) : "";
  const nationalId = formData.get("national-id")?.toString() ?? "";

  const regexNationalId = /^[a-zA-Z0-9]{6,13}$/;

  if (!regexNationalId.test(nationalId))
    throw new Error("Please provide a valid national ID");

  const updatedGuest = await updateGuest(session.user!.guestId!, {
    nationality: nationality,
    country_flag: countryFlag,
    national_id: nationalId,
  });

  if (updatedGuest) revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function singOutAction() {
  await signOut({ redirectTo: "/" });
}
