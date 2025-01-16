"use client";
import { Metadata } from "next";
import useAuthRedirect from '../hooks/useAuthRedirect';
import Head from "next/head";
import Step from "../components/Form/step";
import Form from "../components/Form/form";
import Welcome from "../components/Form/welcome";
import { useState } from "react";

const stepTitles: string[] = ["create wishlist", "add product", "sign up/ login"];

// export const metadata: Metadata = {
//   title: "Free Next.js Template for Startup and SaaS",
//   description: "This is Home for Startup Nextjs Template",
//   // other metadata
// };
interface Wishlist {
  title: string;
  description: string;
  occasion_date: string | null;
  address: string;
  products: any[]; // Replace 'any' with a more specific type if known
}

interface FormData {
  wishlist: Wishlist;
}

export default function Home() {
  useAuthRedirect('/wishlists', true);

  const [showForm, setShowForm] = useState<boolean>(true);
	const [formData, setFormData] = useState<FormData>({
    wishlist: {
      title: "",
      description: "",
      occasion_date: null,
      address: "",
      products: [],
    },

  });

  const [step, setStep] = useState(1);

  function updateFormData(info: Wishlist | any[]) {
    if (step == 1) {
      setFormData({
        ...formData,
        wishlist: info,
      });
    } else if (step == 2) {
      setFormData({
        ...formData.wishlist,
        products: info,
      });
    }

  }

  const handleFormToggle = () => setShowForm(!showForm);

  return (
    <>
      <Head>
        <title>Dropwishes</title>
        <meta name="description" content="Dropwishes website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="anonWishlistForm">
        {showForm && <Welcome handleFormToggle={handleFormToggle} />}
        {!showForm && (
          <>
            <aside>
              {stepTitles.map((title, i) => {
                return (
                  <Step key={title} step={step} stepNumber={i + 1}>
                    {title}
                  </Step>
                );
              })}
            </aside>
            <Form
              step={step}
              setStep={setStep}
              formData={formData}
              updateFormData={updateFormData}
            />
          </>
        )}
      </div>
    </>
  );
}
