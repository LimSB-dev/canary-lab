import type { Metadata } from "next";
import { META_DATA } from "@/constants/metadata";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/reset.css";
import { Providers } from "@/store/providers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: META_DATA.APP_TITLE_TEMPLATE,
    default: META_DATA.APP_DEFAULT_TITLE,
  },
  description: META_DATA.APP_DESCRIPTION,
  manifest: "/manifest.webmanifest",
  verification: {
    google: META_DATA.GOOGLE_SITE_VERIFICATION,
    other: {
      naver: META_DATA.NAVER_SITE_VERIFICATION,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
