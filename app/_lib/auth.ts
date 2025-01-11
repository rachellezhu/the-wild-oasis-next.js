import { createGuest, getGuest } from "@/app/_lib/guest-services";
import NextAuth, { DefaultSession, Session, User } from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user?: {
      guestId: number;
    } & DefaultSession["user"];
  }
}

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }: { auth: Session | null }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: User }) {
      try {
        const existingGuest = await getGuest(user.email!);

        if (!existingGuest)
          await createGuest({ email: user.email, full_name: user.name });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }: { session: Session }) {
      const guest = await getGuest(session.user!.email!);
      session.user!.guestId = guest!.id!;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
