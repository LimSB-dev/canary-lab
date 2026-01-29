import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "My Page",
};

export default async function MyPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { name, email, image } = session.user;

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>마이페이지</h1>
        <div className={styles.profile}>
          {image && (
            <img
              src={image}
              alt={name ?? "Profile"}
              width={96}
              height={96}
              className={styles.avatar}
            />
          )}
          <dl className={styles.info}>
            <dt>이름</dt>
            <dd>{name ?? "-"}</dd>
            <dt>이메일</dt>
            <dd>{email ?? "-"}</dd>
          </dl>
        </div>
      </section>
    </main>
  );
}
