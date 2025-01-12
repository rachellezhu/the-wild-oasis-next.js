"use server";

import { signIn, signOut } from "@/app/_lib/auth";

export async function updateGuestProfile(formData: FormData) {
  console.log(formData);
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function singOutAction() {
  await signOut({ redirectTo: "/" });
}
