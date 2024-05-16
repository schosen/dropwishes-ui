"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
//
// md:py-20 lg:py-28
//-mx-4
// px-4 lg:w-5/12 xl:w-4/12
//sm:p-11 lg:p-8
const Login = () => {
  const { theme } = useTheme();

  return (
    <section id="contact" className="overflow-hidden py-24">
      <div className="container">
        <div className=" flex flex-wrap">
          <div className="w-full px-4 lg:w-[400px] md:w-[400px]">





              <div className="wow fadeInUp shadow-three dark:bg-gray-dark relative z-10 rounded-sm bg-white p-8"
            data-wow-delay=".2s">
                <h3 className="mb-6 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Log In
                </h3>
                {/* <p className="mb-6 text-center text-base font-medium text-body-color">
                  Passwordless Log in
                </p> */}


                <button className="border-stroke dark:text-body-color-dark dark:shadow-two mb-6 flex w-full items-center justify-center rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
                  <span className="mr-3">
                    <svg
                      fill="currentColor"
                      width="22"
                      height="22"
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M32 1.7998C15 1.7998 1 15.5998 1 32.7998C1 46.3998 9.9 57.9998 22.3 62.1998C23.9 62.4998 24.4 61.4998 24.4 60.7998C24.4 60.0998 24.4 58.0998 24.3 55.3998C15.7 57.3998 13.9 51.1998 13.9 51.1998C12.5 47.6998 10.4 46.6998 10.4 46.6998C7.6 44.6998 10.5 44.6998 10.5 44.6998C13.6 44.7998 15.3 47.8998 15.3 47.8998C18 52.6998 22.6 51.2998 24.3 50.3998C24.6 48.3998 25.4 46.9998 26.3 46.1998C19.5 45.4998 12.2 42.7998 12.2 30.9998C12.2 27.5998 13.5 24.8998 15.4 22.7998C15.1 22.0998 14 18.8998 15.7 14.5998C15.7 14.5998 18.4 13.7998 24.3 17.7998C26.8 17.0998 29.4 16.6998 32.1 16.6998C34.8 16.6998 37.5 16.9998 39.9 17.7998C45.8 13.8998 48.4 14.5998 48.4 14.5998C50.1 18.7998 49.1 22.0998 48.7 22.7998C50.7 24.8998 51.9 27.6998 51.9 30.9998C51.9 42.7998 44.6 45.4998 37.8 46.1998C38.9 47.1998 39.9 49.1998 39.9 51.9998C39.9 56.1998 39.8 59.4998 39.8 60.4998C39.8 61.2998 40.4 62.1998 41.9 61.8998C54.1 57.7998 63 46.2998 63 32.5998C62.9 15.5998 49 1.7998 32 1.7998Z" />
                    </svg>
                  </span>
                  Passwordless Login
                </button>
                <div className="mb-4 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Or, Log in with password
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                </div>
                <form>

                  <div className="mb-4">
                    {/* <label
                      htmlFor="name"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Name
                    </label> */}
                    <input
                      type="name"
                      name="name"
                      required
                      placeholder="Enter your Name"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>

                  <div className="mb-4">
                    {/* <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Email
                    </label> */}
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your Email"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>

                  <div className="mb-8">
                    {/* <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Password
                    </label> */}
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="Enter your Password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                    <div className="mb-4 sm:mb-0">
                      <label
                        htmlFor="checkboxLabel"
                        className="flex cursor-pointer select-none items-center text-sm font-medium text-body-color"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="checkboxLabel"
                            className="sr-only"
                          />
                          <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                            <span className="opacity-0">
                              <svg
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                  fill="#3056D3"
                                  stroke="#3056D3"
                                  strokeWidth="0.4"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        Keep me Loged in
                      </label>
                    </div>
                    <div>
                      <a
                        href="#0"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <div className="mb-6">
                    <button className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                      Log in
                    </button>
                  </div>
                </form >
                <p className="text-center text-base font-medium text-body-color">
                  Don’t you have an account?{" "}
                  <Link href="/auth/signup" className="text-primary hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>


{/*
          <div
            className="wow fadeInUp shadow-three dark:bg-gray-dark relative z-10 rounded-sm bg-white p-8 sm:p-11 lg:p-8 xl:p-11"
            data-wow-delay=".2s"
          >
            <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white">
              Subscribe to receive future updates
            </h3>
            <p className="mb-11 border-b border-body-color border-opacity-25 pb-11 text-base leading-relaxed text-body-color dark:border-white dark:border-opacity-25">
              Lorem ipsum dolor sited Sed ullam corper consectur adipiscing Mae ornare
              massa quis lectus.
            </p>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="border-stroke dark:text-body-color-dark dark:shadow-two mb-4 w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="border-stroke dark:text-body-color-dark dark:shadow-two mb-4 w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
              />
              <input
                type="submit"
                value="Subscribe"
                className="shadow-submit dark:shadow-submit-dark mb-5 flex w-full cursor-pointer items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
              />
              <p className="dark:text-body-color-dark text-center text-base leading-relaxed text-body-color">
                No spam guaranteed, So please don’t send any spam mail.
              </p>
            </div>

            <div>
              <span className="absolute left-2 top-7">
                <svg
                  width="57"
                  height="65"
                  viewBox="0 0 57 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M0.407629 15.9573L39.1541 64.0714L56.4489 0.160793L0.407629 15.9573Z"
                    fill="url(#paint0_linear_1028_600)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1028_600"
                      x1="-18.3187"
                      y1="55.1044"
                      x2="37.161"
                      y2="15.3509"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                        stopOpacity="0.62"
                      />
                      <stop
                        offset="1"
                        stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </span>

              <span className="absolute bottom-24 left-1.5">
                <svg
                  width="39"
                  height="32"
                  viewBox="0 0 39 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M14.7137 31.4215L38.6431 4.24115L6.96581e-07 0.624124L14.7137 31.4215Z"
                    fill="url(#paint0_linear_1028_601)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1028_601"
                      x1="39.1948"
                      y1="38.335"
                      x2="10.6982"
                      y2="10.2511"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                        stopOpacity="0.62"
                      />
                      <stop
                        offset="1"
                        stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </span>

              <span className="absolute right-2 top-[140px]">
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M10.6763 35.3091C23.3976 41.6367 38.1681 31.7045 37.107 17.536C36.1205 4.3628 21.9407 -3.46901 10.2651 2.71063C-2.92254 9.69061 -2.68321 28.664 10.6763 35.3091Z"
                    fill="url(#paint0_linear_1028_602)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1028_602"
                      x1="-0.571054"
                      y1="-37.1717"
                      x2="28.7937"
                      y2="26.7564"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                        stopOpacity="0.62"
                      />
                      <stop
                        offset="1"
                        stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </span>

              <span className="absolute right-0 top-0">
                <svg
                  width="162"
                  height="91"
                  viewBox="0 0 162 91"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.3">
                    <path
                      opacity="0.45"
                      d="M1 89.9999C8 77.3332 27.7 50.7999 50.5 45.9999C79 39.9999 95 41.9999 106 30.4999C117 18.9999 126 -3.50014 149 -3.50014C172 -3.50014 187 4.99986 200.5 -8.50014C214 -22.0001 210.5 -46.0001 244 -37.5001C270.8 -30.7001 307.167 -45 322 -53"
                      stroke="url(#paint0_linear_1028_603)"
                    />
                    <path
                      opacity="0.45"
                      d="M43 64.9999C50 52.3332 69.7 25.7999 92.5 20.9999C121 14.9999 137 16.9999 148 5.49986C159 -6.00014 168 -28.5001 191 -28.5001C214 -28.5001 229 -20.0001 242.5 -33.5001C256 -47.0001 252.5 -71.0001 286 -62.5001C312.8 -55.7001 349.167 -70 364 -78"
                      stroke="url(#paint1_linear_1028_603)"
                    />
                    <path
                      opacity="0.45"
                      d="M4 73.9999C11 61.3332 30.7 34.7999 53.5 29.9999C82 23.9999 98 25.9999 109 14.4999C120 2.99986 129 -19.5001 152 -19.5001C175 -19.5001 190 -11.0001 203.5 -24.5001C217 -38.0001 213.5 -62.0001 247 -53.5001C273.8 -46.7001 310.167 -61 325 -69"
                      stroke="url(#paint2_linear_1028_603)"
                    />
                    <path
                      opacity="0.45"
                      d="M41 40.9999C48 28.3332 67.7 1.79986 90.5 -3.00014C119 -9.00014 135 -7.00014 146 -18.5001C157 -30.0001 166 -52.5001 189 -52.5001C212 -52.5001 227 -44.0001 240.5 -57.5001C254 -71.0001 250.5 -95.0001 284 -86.5001C310.8 -79.7001 347.167 -94 362 -102"
                      stroke="url(#paint3_linear_1028_603)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_1028_603"
                      x1="291.35"
                      y1="12.1032"
                      x2="179.211"
                      y2="237.617"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset="0.328125"
                        stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                      />
                      <stop
                        offset="1"
                        stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                        stopOpacity="0"
                      />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1028_603"
                      x1="333.35"
                      y1="-12.8968"
                      x2="221.211"
                      y2="212.617"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset="0.328125"
                        stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                      />
                      <stop
                        offset="1"
                        stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                        stopOpacity="0"
                      />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_1028_603"
                      x1="294.35"
                      y1="-3.89678"
                      x2="182.211"
                      y2="221.617"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset="0.328125"
                        stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                      />
                      <stop
                        offset="1"
                        stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                        stopOpacity="0"
                      />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_1028_603"
                      x1="331.35"
                      y1="-36.8968"
                      x2="219.211"
                      y2="188.617"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset="0.328125"
                        stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                      />
                      <stop
                        offset="1"
                        stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </div>
          </div> */}











          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
