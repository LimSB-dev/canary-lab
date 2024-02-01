import Image from "next/image";
import Link from "next/link";
import React from "react";

export const DefaultLogo = () => {
  return (
    <Link href="/" passHref>
      <Image src="/favicon.ico" alt="logo" width={16} height={16} />
    </Link>
  );
};
