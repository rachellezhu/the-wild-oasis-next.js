import React from "react";
import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_styles/globals.css";

export const metadata = {
  title: "The Wild Oasis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
        </header>

        <Navigation />

        <main>{children}</main>

        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
