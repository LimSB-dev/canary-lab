"use client";

import { TypeAnimation } from "react-type-animation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import Image from "next/image";
import { useAppDispatch } from "@/hooks/reduxHook";
import { signIn } from "@/store/modules/user";
import { getUser } from "@/app/api/users";

const UserProfile = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const welcomeText = `${user.name}님 환영합니다.`;
  const WELCOME_SEQUENCE = [];

  for (let i = 1; i <= welcomeText.length; i++) {
    WELCOME_SEQUENCE.push(welcomeText.slice(0, i));
    WELCOME_SEQUENCE.push(100);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) {
          const userData = await getUser(user.email);
          dispatch(signIn(userData));

          setTimeout(() => {
            router.push("/");
          }, welcomeText.length * 100);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [user, router, welcomeText, dispatch]);

  return (
    <>
      <TypeAnimation sequence={WELCOME_SEQUENCE} />

      {user.image && user.name && (
        <Image
          src={user.image}
          alt={user.name}
          width={240}
          height={240}
          style={{
            borderRadius: "2px",
          }}
          priority
        />
      )}
    </>
  );
};

export default UserProfile;
