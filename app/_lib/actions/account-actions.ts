"use server";

import { revalidatePath } from "next/cache";
import { checkAuth } from "../auth/auth";
import { updateGuest } from "../guest-services";

const regexNationalId = /^[a-zA-Z0-9]{6,16}$/;

export async function updateGuestProfile(formData: FormData) {
  const session = await checkAuth();

  const nationalProp = formData.get("nationality")?.toString().split("%");
  const nationality =
    nationalProp && nationalProp.length == 2 ? nationalProp.at(0) : "";
  const countryFlag =
    nationalProp && nationalProp.length == 2 ? nationalProp.at(1) : "";
  const nationalId = formData.get("national-id")?.toString() ?? "";

  if (!regexNationalId.test(nationalId))
    throw new Error("Please provide a valid national ID");

  const updatedGuest = await updateGuest(session.user!.guestId!, {
    nationality: nationality,
    country_flag: countryFlag,
    national_id: nationalId,
  });

  if (updatedGuest) revalidatePath("/account/profile");
}
