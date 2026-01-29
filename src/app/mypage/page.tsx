import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { MypageContent } from "./MypageContent";

export const metadata: Metadata = {
  title: "My Page",
};

export default async function MyPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return <MypageContent session={session} />;
}
