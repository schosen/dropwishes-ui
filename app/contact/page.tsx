import React, { FC } from "react";
import SocialsList from "@/components/shared/social/SocialsList";
import Label from "@/components/shared/Label";
import Input from "@/components/shared/Input";
import Textarea from "@/components/shared/Textarea";
import ButtonPrimary from "@/components/shared/button/ButtonPrimary";
import BackgroundSection from "@/components/shared/BackgroundSection";
// import SectionPromo1 from "@/components/SectionPromo1";

const info = [
  {
    title: "🗺 CONTACT US",
    desc: "For all enquiries please use the details below or contact us using our contact form",
  },
  {
    title: "💌 EMAIL",
    desc: "info@dropwishes.com",
  },
  // {
  //   title: "☎ PHONE",
  //   desc: "000-123-456-7890",
  // },
];

const PageContact = ({}) => {
  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className="">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Contact
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-12 ">
            <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 SOCIALS
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
            <div>
              <form className="grid grid-cols-1 gap-6" action="#" method="post">
                <label className="block">
                  <Label>Full name</Label>

                  <Input
                    placeholder="Example Doe"
                    type="text"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>Email address</Label>

                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>Message</Label>

                  <Textarea className="mt-1" rows={6} />
                </label>
                <div>
                  <ButtonPrimary type="submit">Send Message</ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PageContact;
