"use client";
import { getUsers } from "@/_actions/service";
import MainContainer from "@/component/mainContainer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserContext from "./context";
import withAuth from "@/lib/auth";

function Home() {
  const [state, setState]: any = useState({});
  const router = useRouter();

  const userId = localStorage.getItem("userId");
  const isValidUser = localStorage.getItem("isValidUser");

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

  document.title = "Freelancer";

  return (
    <div>
      <UserContext.Provider value={state}>
        <MainContainer />
      </UserContext.Provider>
    </div>
  );
}

export default withAuth(Home);