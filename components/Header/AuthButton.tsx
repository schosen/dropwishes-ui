"use client"
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";


export interface AuthButtonProps {
  className?: string;
}

export default function AuthButton({className = ""}) {
    // authentication state / handle logout
    const { isAuthenticated, login, logout } = useAuth();
    const handleLogout = async () => {
      await logout();
    };

    return (
       <>
      {isAuthenticated ? (
        <button onClick={handleLogout}
          className={`ease-in-up shadow-btn hover:shadow-btn-hover rounded-sm bg-blue-500 px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9 ${className}`}
        >
          Log Out
        </button>
        ) : (
          <>
        <Link
          href="/auth/login"
          className={`${className} px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block`}
        >
          Log In
        </Link>
        <Link
          href="/auth/signup"
          className={`ease-in-up shadow-btn hover:shadow-btn-hover rounded-sm bg-blue-500 px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9 ${className}`}
        >
          Sign Up
        </Link>
        </>
        )}
      </>
    )
}
