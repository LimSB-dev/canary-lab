import type { Metadata } from "next";
import { META_DATA } from "@/constants/metadata";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/reset.css";
import { Providers } from "@/store/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: META_DATA.APP_TITLE_TEMPLATE,
    default: META_DATA.APP_DEFAULT_TITLE,
  },
  description: META_DATA.APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: META_DATA.APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: META_DATA.APP_NAME,
    title: {
      default: META_DATA.APP_DEFAULT_TITLE,
      template: META_DATA.APP_TITLE_TEMPLATE,
    },
    description: META_DATA.APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: META_DATA.APP_DEFAULT_TITLE,
      template: META_DATA.APP_TITLE_TEMPLATE,
    },
    description: META_DATA.APP_DESCRIPTION,
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
