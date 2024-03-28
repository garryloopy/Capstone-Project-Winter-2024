"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useLoadingState } from "@/components/useLoadingState";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import OpenEye from "@/app/icons/OpenEye";
import CloseEye from "@/app/icons/CloseEye";

export default function SignInPage() {
  const [clientInput, setClientInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);
  const [viewMessage, setViewMessage] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const loading = useLoadingState();
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
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="p-[2rem] my-10 flex flex-col gap-8 justify-center items-center w-full lg:max-w-[50%] mx-auto border-2 border-gray-200 rounded-md bg-gray-100/80 ">
          <h1 className="lg:text-3xl md:text-xl text-md text-primary ">
            Sign in your account
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
            <label className="w-full">
              <span className=" text-gray-700">Email address</span>
              <input
                type="email"
                name="email"
                value={clientInput.email}
                placeholder="Email"
                className="form_input"
                onChange={handleChange}
              />
            </label>
            <label className="w-full relative">
              <span className=" text-gray-700 text-sm sm:text-md">
                Password
              </span>
              <input
                type={!showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={clientInput.password}
                className="form_input"
                onChange={handleChange}
              />

              <div
                className="w-4 h-4 absolute top-[40%] right-[15px] cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <OpenEye /> : <CloseEye />}
              </div>
            </label>

            <button type="submit" className="sign_button mt-2">
              {buttonLoading ? "Loading ..." : "Sign in"}
            </button>
          </form>
          <Link className="mt-4 self-end text-sm" href="/register">
            Don't have an account?{" "}
            <span className="underline font-semibold">Register</span>
          </Link>
        </section>
      )}
    </>
  );
}
