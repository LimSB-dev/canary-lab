import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminVideoViewer } from "./AdminVideoViewer";

export const metadata: Metadata = {
  title: "Admin",
};

const DEFAULT_YTORY_MOV_URL =
  "https://ax0nw7sdddyydzms.public.blob.vercel-storage.com/ytory.mov";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.userType !== "admin") {
    redirect("/");
  }

  return (
    <main>
      <AdminVideoViewer
        initialVideoUrl={process.env.NEXT_PUBLIC_YTORY_MOV_URL ?? DEFAULT_YTORY_MOV_URL}
      />
    </main>
  );
}
