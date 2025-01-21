import { auth } from "@/app/_lib/auth/auth";

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
