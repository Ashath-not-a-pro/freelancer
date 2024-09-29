"use client";
import { getUsers } from "@/_actions/service";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

// Create UserContext
const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter()

  const userId = localStorage.getItem("userId");
    const isValidUser = localStorage.getItem("isValidUser");

  async function fetchUserData() {
    if (userId && isValidUser && !user) {
      // Fetch user data if valid
      const response = await getUsers({ _id: userId });
      if (response && response.length > 0) {
        const isFreelancer = response[0].user_type == "freelancer";
        setUser({ isFreelancer, ...response[0] });
      }
    }
  }

  const reload = ()=> {
    fetchUserData();
  }

  useEffect(() => {

    if(!isValidUser || !userId){
      router.push("/login")
    }

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, reload }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
