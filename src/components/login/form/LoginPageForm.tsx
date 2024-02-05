"use client";

import { authenticate } from "@/lib/actions";
import { useFormState } from "react-dom";

import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const LoginPageForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form className={styles.form} action={dispatch}>
      <label className={styles.flex_column} htmlFor="email">
        Email
        <div className={styles.input_container}>
          <input type="email" id="email" placeholder="Email" required />
        </div>
      </label>
      <label className={styles.flex_column} htmlFor="password">
        Password
        <div className={`${styles.input_container} ${styles.password}`}>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />
          <FontAwesomeIcon icon={faEye} />
        </div>
      </label>
      <div className={styles.flex_row}>
        <label className={styles.flex_row} htmlFor="remember">
          <input type="checkbox" id="remember" />
          Remember me
        </label>
        <Link href="/forgot-password">Forgot password?</Link>
      </div>
      <button type="submit" className={styles.login_button}>
        Login
      </button>
      {errorMessage && (
        <div>
          <p>There was an error:</p>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      )}
    </form>
  );
};

export default LoginPageForm;
