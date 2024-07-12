"use client";
import withAuthRedirect from '../../../hoc/withAuthRedirect'
import { useAuth } from '../../../context/AuthContext';
import React, { useState, useRef } from "react";
import OTPInput from "../../../components/OTPInput";


const PasscodePage = () => {
  const { isAuthenticated, signup, authError } = useAuth();

  return (
    <>
    <section id="contact" className="overflow-hidden py-36">
      <div className="container">
        <div className=" flex flex-wrap">
          <div className="w-full px-4 lg:w-[400px] md:w-[400px]">


            { authError && <div id="alert-2" className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div className="ms-3 text-sm font-medium">
                {authError}
              </div>
              <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button>
            </div>}




            <div className="wow fadeInUp shadow-three dark:bg-gray-dark relative z-10 rounded-sm bg-white p-8"
            data-wow-delay=".2s">
            <h3 className="mb-6 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
            Enter Code
            </h3>


            <form>
            <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {/* <OTPInput
                length={6}
                className="otpContainer"
                inputClassName="otpInput"
                isNumberInput
                autoFocus
                onChangeOTP={otp => console.log("Number OTP: ", otp)}
                /> */}

                <div className="w-12 h-14 ">
                    <input className="w-full h-full flex flex-col items-center justify-center text-center px-4 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 dark:text-body-color-dark  text-body-color" type="text" name="" id="" inputMode="numeric" autoComplete="one-time-code"/>
                </div>
                <div className="w-12 h-14 ">
                    <input className="w-full h-full flex flex-col items-center justify-center text-center px-4 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 dark:text-body-color-dark  text-body-color" type="text" name="" id="" inputMode="numeric" autoComplete="one-time-code"/>
                </div>
                <div className="w-12 h-14 ">
                    <input className="w-full h-full flex flex-col items-center justify-center text-center px-4 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 dark:text-body-color-dark  text-body-color" type="text" name="" id="" inputMode="numeric" autoComplete="one-time-code"/>
                </div>
                <div className="w-12 h-14 ">
                    <input className="w-full h-full flex flex-col items-center justify-center text-center px-4 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 dark:text-body-color-dark  text-body-color" type="text" name="" id="" inputMode="numeric" autoComplete="one-time-code"/>
                </div>
                <div className="w-12 h-14 ">
                    <input className="w-full h-full flex flex-col items-center justify-center text-center px-4 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 dark:text-body-color-dark  text-body-color" type="text" name="" id="" inputMode="numeric" autoComplete="one-time-code"/>
                </div>
                <div className="w-12 h-14 ">
                    <input className="w-full h-full flex flex-col items-center justify-center text-center px-4 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 dark:text-body-color-dark  text-body-color" type="text" name="" id="" inputMode="numeric" autoComplete="one-time-code"/>
                </div>

              </div>

                <div className="flex flex-col space-y-5">
                <div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                    Verify Account
                    </button>
                </div>

                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Did not recieve code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                </div>
                </div>
            </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    </section>


    </>
  );
};

export default withAuthRedirect(PasscodePage);
