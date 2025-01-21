"use server";

import { signIn, signOut } from "@/app/_lib/auth/auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function singOutAction() {
  await signOut({ redirectTo: "/" });
}
