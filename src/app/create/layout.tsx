import { META_DATA } from "@/constants/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create",
  description: META_DATA.APP_DESCRIPTION.CREATE,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
