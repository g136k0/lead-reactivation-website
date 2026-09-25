import type { Metadata } from "next";
import Script from "next/script";
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
      <body>
        {children}
        <Script id="omnisend-tracking" strategy="afterInteractive">
          {`
            window.omnisend = window.omnisend || [];
            window.omnisend.push(["brandID", "6ab5c763f65e46dae6b9acc2"]);
            window.omnisend.push(["track", "$pageViewed"]);

            (function () {
              var script = document.createElement("script");
              script.type = "text/javascript";
              script.async = true;
              script.src = "https://omnisnippet1.com/inshop/launcher-v2.js";
              var firstScript = document.getElementsByTagName("script")[0];
              firstScript.parentNode.insertBefore(script, firstScript);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
