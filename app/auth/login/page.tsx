import Link from "next/link";
import { Metadata } from "next";
// import { useState } from 'react';
// import { useRouter } from 'next/router';
import Login from "@/components/Auth/Login";

export const metadata: Metadata = {
  title: "Log In Page | Dropwishes",
  description: "This is Log In Page for Drop Wishes",
  // other metadata
};

// Form fetching goes here
const LoginPage = () => {

  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
