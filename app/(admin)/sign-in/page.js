"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
// import { useLoadingState } from "@/components/useLoadingState";
// import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import OpenEye from "@/app/icons/OpenEye";
import CloseEye from "@/app/icons/CloseEye";
import InputAnimation from "@/components/InputAnimation";

export default function SignInPage() {
  const [clientInput, setClientInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);
  const [viewMessage, setViewMessage] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  // const loading = useLoadingState();
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setViewMessage("");
  };

  const handleSubmit = async (e) => {
    setButtonLoading(true);
    e.preventDefault();
    const { email, password } = clientInput;

    // callbackUrl: "/menu-list",

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      }).then(({ ok, error }) => {
        if (ok) {
          router.push("/menu-list");
        } else {
          setViewMessage("Username or password is incorrect");
        }
      });
      setButtonLoading(false);
    } catch (error) {
      setViewMessage("Invalid email or password");
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    // <>
    //   {loading ? (
    //     <Loading />
    //   ) : (
    <section className="w-full h-screen grid place-items-center">
      <section className="p-[2rem] my-10 flex flex-col gap-8 justify-center items-center w-full lg:max-w-[50%] mx-auto border-2 border-slate-300 rounded-md bg-gray-50 backdrop-blur-sm shadow-lg">
        <h1 className="lnFont text-2xl text-slate-700">
          Log in to your account
        </h1>
        <form
          className="flex flex-col justify-center items-center gap-4 w-full"
          onSubmit={handleSubmit}
        >
          {viewMessage && (
            <span className="p-4 mb-2 text-lg font-semibold text-red-500">
              {viewMessage}
            </span>
          )}
          <label className="text-sm w-full flex-1 relative flex flex-col justify-end cursor-text border-2 rounded-md shadow-sm focus-within:shadow-md transition-shadow duration-300 group bg-white">
            <input
              type="email"
              name="email"
              value={clientInput.email}
              className="w-full h-10 outline-none peer bg-gray-100 p-2 text-gray-600 rounded-md focus:ring-2 focus:ring-emerald-500"
              onChange={handleChange}
              required
            />
            <InputAnimation text="Email" stateValue={clientInput.email} />
          </label>
          <label className="text-sm w-full flex-1 relative flex flex-col justify-end cursor-text border-2 rounded-md shadow-sm focus-within:shadow-md transition-shadow duration-300 group bg-white">
            <input
              type={!showPassword ? "text" : "password"}
              name="password"
              value={clientInput.password}
              className="w-full h-10 outline-none peer bg-gray-100 p-2 text-gray-600 rounded-md focus:ring-2 focus:ring-emerald-500"
              onChange={handleChange}
              required
            />

            <div
              className="w-4 h-4 absolute top-[20%] right-[15px] cursor-pointer"
              onClick={togglePassword}
            >
              {showPassword ? <OpenEye /> : <CloseEye />}
            </div>
            <InputAnimation text="Password" stateValue={clientInput.password} />
          </label>

          <button type="submit" className="sign_button mt-2">
            {buttonLoading ? "Loading ..." : "Sign in"}
          </button>
        </form>
        <Link className="mt-4 self-end text-sm" href="/register">
          Don&apos;t have an account?{" "}
          <span className="underline font-semibold hover:text-sky-800">
            Register
          </span>
        </Link>
      </section>
    </section>
    //   )}
    // </>
  );
}
