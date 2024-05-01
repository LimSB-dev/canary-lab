import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

interface IProps {
  size?: "small" | "medium" | "large";
}

const DefaultLogo = ({ size = "medium" }: IProps) => {
  const logoSize = {
    small: { width: 24, height: 24 },
    medium: { width: 48, height: 48 },
    large: { width: 64, height: 64 },
  };

  return (
    <Link href="/" passHref className={styles.link}>
      <Image
        src="/favicon.ico"
        alt="logo"
        width={logoSize[size].width}
        height={logoSize[size].height}
      />
    </Link>
  );
};

export default DefaultLogo;
