import Image from "next/image";
import Link from "next/link";
import React from "react";

export const DefaultLogo = () => {
  return (
    <Link href="/" passHref>
      <Image src="/favicon.ico" alt="logo" width={64} height={64} />
    </Link>
  );
};
