import { signInAction } from "@/app/_lib/actions/sign-in-out";
import Image from "next/image";

export default function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height={24}
          width={24}
        />
        Continue with Google
      </button>
    </form>
  );
}
