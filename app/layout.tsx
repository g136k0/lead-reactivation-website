import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadRevive | Lead Recovery Systems",
  description:
    "Recover dormant leads and convert more new enquiries into qualified, attended appointments.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
