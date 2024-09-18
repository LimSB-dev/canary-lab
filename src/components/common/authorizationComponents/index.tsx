"use client";

import { useAppSelector } from "@/hooks/reduxHook";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const AuthorizationComponents = () => {
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.userType !== "admin") {
      redirect("/");
    }
  });
  return null;
};

export default AuthorizationComponents;
