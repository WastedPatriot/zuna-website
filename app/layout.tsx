import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zuna - Financial Wellness App",
  description: "Banking reimagined with your Tamagotchi companion. Save, play, and grow your financial future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black antialiased">
        {children}
      </body>
    </html>
  );
}