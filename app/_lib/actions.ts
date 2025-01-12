"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { updateGuest } from "./guest-services";
import { revalidatePath } from "next/cache";
import { useParams, usePathname } from "next/navigation";

export async function updateGuestProfile(formData: FormData) {
  console.log(formData);
  const session = await auth();
  const nationality = formData.get("nationality")
    ? formData.get("nationality")?.toString().split("%").at(0)
    : "";
  const countryFlag = formData.get("nationality")
    ? formData.get("nationality")?.toString().split("%").at(1)
    : "";
  const nationalId = formData.get("national-id")?.toString() ?? "";
  console.log(nationality);
  console.log(countryFlag);
  console.log(nationalId);
  console.log(session?.user?.guestId);

  if (!nationality || !countryFlag || !nationalId) return;

  await updateGuest(session!.user!.guestId!, {
    nationality: nationality,
    country_flag: countryFlag,
    national_id: nationalId,
  });

  return revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function singOutAction() {
  await signOut({ redirectTo: "/" });
}
