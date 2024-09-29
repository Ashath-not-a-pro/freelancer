"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import UserContext from "@/context/userContext";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const { user } = useContext(UserContext);

    useEffect(() => {
      // Redirect to login if the user is not authenticated
      const isValidUser = localStorage.getItem("isValidUser");
      const userId = localStorage.getItem("userId");

      if (!isValidUser || !userId) {
        router.push("/login");
      }
    }, [user, router]);

    // If user is not loaded, show nothing or a loader
    if (!user) {
      return null;
    }

    // Render the wrapped component if the user is authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
