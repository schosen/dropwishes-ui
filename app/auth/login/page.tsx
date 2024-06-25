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
  //   const [name, setName] = useState('');
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  //   // const router = useRouter();

  // async function onSubmit(e) {
  //   e.preventDefault();
  //   // Logic for form submission, such as a POST request

  // }

  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
