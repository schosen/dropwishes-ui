import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getAccount } from "@/services/wishlistService";
import axiosInstance from '../utils/axios';  // Use the configured axios instance


// Define User Type
interface User {
  firstName: string;
  lastname: string;
  email: string;
  birthday: string;
  gender: string;
  username: string;
}

// Context and Hook
const UserContext = createContext<{
  user: User | null;
  fetchUser: () => Promise<void>;
}>({
  user: null,
  fetchUser: async () => {},
});

export const useUser = () => useContext(UserContext);

// Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);


  const fetchUser = async () => {
    if (!user) { // Only fetch if not already fetched
      try {
        const accDetails = await axiosInstance.get(`/api/user/me/`);
      if (!accDetails || !accDetails.data) {
        console.error("Invalid account response");
        setUser(null);
      }

      {console.log("response.data = ", accDetails.data)}
        const username = `${accDetails.first_name} ${accDetails.first_name}` || accDetails.email.split("@")[0];
        setUser({ ...accDetails, username });


      } catch (error: any) {
        if (error.response?.status === 401) {
          console.warn("Token expired. Redirecting to login...");
          // Redirect to login or refresh token
        } else {
          console.error('Error fetching account details:', error);
        }
      // return null;
      }
    }

      // {console.log("accDetails =", accDetails)}
      // const userDetails = accDetails
      //   ? {
      //       firstName: accDetails.first_name,
      //       lastName: accDetails.last_name,
      //       email: accDetails.email,
      //       gender: accDetails.gender,
      //       birthday: accDetails.birthday,
      //       username: `${accDetails.first_name} ${accDetails.last_name}` || accDetails.email.split("@")[0],
      //     }
      //   : null;
      // setUser(userDetails);
    // }
  };

  return (
    <UserContext.Provider value={{ user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
