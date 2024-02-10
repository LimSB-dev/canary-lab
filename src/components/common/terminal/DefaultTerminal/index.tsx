"use client";

import { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

interface IProps {
  redirect: string;
  title: string;
  command: ICommand;
  sequence: (string | number | (() => void))[];
}

interface ICommand {
  key: string;
  name: string;
}

const DefaultTerminal = ({ redirect, title, command, sequence }: IProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === command.key) {
        router.push(redirect);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className={styles.terminal_loader}>
      <div className={styles.terminal_header}>
        <div className={styles.terminal_controls}>
          <div className={`${styles.control} ${styles.close}`}></div>
          <div className={`${styles.control} ${styles.minimize}`}></div>
          <div className={`${styles.control} ${styles.maximize}`}></div>
        </div>
        <div className={styles.terminal_title}>{title}</div>
        <div className={styles.terminal_command}>CMD + {command.name}</div>
      </div>
      <div className={styles.terminal_body}>
        <TypeAnimation sequence={sequence} />
      </div>
    </div>
  );
};

export default DefaultTerminal;
