import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lead Recovery & Conversion System",
  description:
    "Recover dormant leads and convert more new enquiries into qualified, attended appointments.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
