import type { Metadata } from "next";
import { META_DATA } from "@/constants/metadata";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/reset.css";
import { auth } from "@/auth";
import { Providers } from "@/store/providers";
import { SessionToRedux } from "@/components/common/SessionToRedux";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/common/google";
import { MainFooter } from "@/components/common/footer";
import { FloatingScrollToTop } from "@/components/common/topButton";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: META_DATA.APP_TITLE_TEMPLATE,
    default: META_DATA.APP_DEFAULT_TITLE,
  },
  description: META_DATA.APP_DESCRIPTION.MAIN,
  manifest: "/manifest.json",
  verification: {
    google: META_DATA.GOOGLE_SITE_VERIFICATION,
    other: {
      naver: META_DATA.NAVER_SITE_VERIFICATION,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* AdSense Script */}
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5392145622568260"
          crossOrigin="anonymous"
        />

        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />

        <Providers>
          <SessionToRedux session={session} />
          {children}
          <FloatingScrollToTop />
          <MainFooter />
        </Providers>
      </body>
    </html>
  );
}
