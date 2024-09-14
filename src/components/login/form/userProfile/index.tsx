"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import Image from "next/image";
import { useAppDispatch } from "@/hooks/reduxHook";
import { signIn } from "@/store/modules/user";
import { fetchUser } from "@/lib/fetch/users";

const UserProfile = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) {
          const userData = await fetchUser(user.email);
          dispatch(signIn(userData));
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
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
