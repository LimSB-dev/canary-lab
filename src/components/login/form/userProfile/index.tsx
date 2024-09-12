"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import Image from "next/image";
import { useAppDispatch } from "@/hooks/reduxHook";
import { signIn } from "@/store/modules/user";

const UserProfile = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    try {
      if (user?.email) {
        dispatch(signIn(user));
      }
    } finally {
      if (user?.email) {
        router.push("/");
      }
    }
  }, [user, router, dispatch]);

  return (
    <>
      <p>{user.name}</p>

      {user.image && user.name && (
        <Image src={user.image} alt={user.name} width={100} height={100} />
      )}
    </>
  );
};

export default UserProfile;
