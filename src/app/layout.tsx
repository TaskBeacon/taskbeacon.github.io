import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "TaskBeacon",
    template: "%s | TaskBeacon"
  },
  description:
    "TaskBeacon organizes reusable PsyFlow and TAPS tasks, browser previews, tutorials, framework references, and contribution workflows.",
  metadataBase: new URL("https://taskbeacon.github.io"),
  openGraph: {
    title: "TaskBeacon",
    description:
      "Reusable local tasks, aligned browser previews, and a clearer path from paradigm to deployment.",
    type: "website",
    url: "https://taskbeacon.github.io/",
    images: [{ url: "/og.svg" }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-dvh tb-grid-bg">
          <SiteHeader />
          <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
