import React from "react";
import Image from "next/image";
import singupImage from "../assets/images/signup.svg";
import logo from "../assets/images/ReCompute.png";
import Link from "next/link";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";

function login() {
    return (
    <div className="flex p-4 h-screen md:h-full md:pb-44 lg:pb-0 lg:items-start">
    <div className="w-full lg:w-1/2 flex flex-col ">
      <div className="flex items-center">
        <Image src={logo} alt="Logo" className="w-1/6 lg:w-1/12" />
        <h1 className="font-bold text-2xl">ReCompute</h1>
      </div>
      <div className="pt-20 flex flex-col items-center lg:pt-12 lg:w-2/3">
        <div className="w-full max-w-md">
          <h1 className="w-full text-2xl font-bold pb-4 text-left lg:text-4xl">
            Sign in to your account
          </h1>
          <p className="text-gray-500 pb-4">
            I don't have an account yet{" "}
            <Link href={"/signup"}>
              <span className="underline underline-offset-2">Sign up</span>
            </Link>{" "}
          </p>
          <form
            action="POST"
            className="flex flex-col space-y-4 lg:space-y-3"
          >
            <input
              type="text"
              placeholder="Email"
              required
              className="px-3 py-4 rounded-lg border border-gray-300"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="px-3 py-4 rounded-lg border border-gray-300"
            />
            <button
              type="submit"
              className="bg-[#F55266] hover:bg-[#f55265c8] px-3 py-4 rounded-lg text-lg font-semibold"
            >
              Log in
            </button>
            <div className="flex items-center justify-center">
              <hr className="flex-grow text-gray-300" />
              <p className="px-3">or continue with</p>
              <hr className="flex-grow text-gray-300" />
            </div>
            <div className="flex justify-center gap-x-4">
              <button
                type="submit"
                className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-x-2"
              >
                <FaFacebookF />
                Facebook
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-x-2"
              >
                <FaGoogle />
                Google
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-x-2"
              >
                <FaApple />
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div className="hidden lg:block lg:w-1/2">
      <Image src={singupImage} alt="Sign Up" />
    </div>
  </div>
);
}

export default login;