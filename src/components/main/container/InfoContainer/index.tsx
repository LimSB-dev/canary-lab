import styles from "./styles.module.scss";
import {
  GithubCard,
  NameCard,
  ProfileCard,
  RateCard,
  RoleCard,
} from "@/components/main/card";

export const InfoContainer = () => {
  return (
    <section className={styles.info_section}>
      <RateCard />
      <div className={styles.info_main}>
        <ProfileCard />
        <GithubCard />
      </div>
      <div className={styles.info_sub}>
        <NameCard />
        <RoleCard />
      </div>
    </section>
  );
};
