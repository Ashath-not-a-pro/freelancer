"use client";
import { getUsers } from "@/_actions/service";
import MainContainer from "@/component/mainContainer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [state, setState]: any = useState({});
  const router = useRouter();
  const userId = localStorage.getItem("userId");
  const isValidUser = localStorage.getItem("isValidUser");
  const lastLoginAt = localStorage.getItem("loginAt");

  useEffect(() => {
    async function revalidate() {
      const userData = await getUsers({ _id: userId });
      if (userData.length > 0 && isValidUser) {
        setState(userData[0]);
      } else {
        router.push("/login");
      }
    }
    revalidate();
  }, []);

  return <>{isValidUser ? <MainContainer /> : <></>}</>;
}
