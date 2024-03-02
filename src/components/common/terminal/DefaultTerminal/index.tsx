"use client";

import { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

interface IProps {
  /**
   * The path to redirect when the command is entered or sequence is complete
   */
  redirect: string;
  /**
   * The title of the terminal
   */
  title: string;
  /**
   * The command to exit the terminal
   */
  command: ICommand;
  /**
   * The sequence of text to display in the terminal or a function
   */
  sequence: (string | number | (() => void))[];
}

interface ICommand {
  /**
   * The key to press to exit the terminal
   * @example "Escape" or "x"
   */
  key: string;
  /**
   * The name of the key to display in the terminal
   * @example "ESC" or "X"
   */
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
  }, [command.key, redirect, router]);

  return (
    <article className={styles.terminal_loader}>
      <header className={styles.terminal_header}>
        <ul className={styles.terminal_controls}>
          <li className={`${styles.control} ${styles.close}`}></li>
          <li className={`${styles.control} ${styles.minimize}`}></li>
          <li className={`${styles.control} ${styles.maximize}`}></li>
        </ul>
        <p className={styles.terminal_title}>{title}</p>
        <nav className={styles.terminal_command}>CMD + {command.name}</nav>
      </header>
      <section className={styles.terminal_body}>
        <TypeAnimation sequence={sequence} />
      </section>
    </article>
  );
};

export default DefaultTerminal;
