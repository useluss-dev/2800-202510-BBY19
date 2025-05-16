'use client'
import React, { useState } from "react";
import Image from "next/image";
import singupImage from "../assets/images/signup.svg";
import logo from "../assets/images/ReCompute.png";
import Link from "next/link";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";

function SignUp() {
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phonenumber, setPhonenumber] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { fullname, email, password, phonenumber };
        // Perform validation and send data to the backend 
        console.log({ fullname, email, password, phonenumber })
        const user = { fullname: fullname, email: email, password: password, phonenumber: phonenumber };
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        const data = await res.json();
        console.log(data);
        const [status, message] = [res.status, data.message || data.error || 'No response message'];
        console.log(status, message);
        alert(data.message || data.error || 'No response message');

    };


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
                            Create an account
                        </h1>
                        <p className="text-gray-500 pb-4">
                            I already have an account{" "}
                            <Link href={"/login"}>
                                <span className="underline underline-offset-2">Sign in</span>
                            </Link>{" "}
                        </p>
                        <form onSubmit={handleSubmit}
                            className="flex flex-col space-y-4 lg:space-y-3"
                        >
                            <input
                                type="text"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                placeholder="Full Name"
                                required
                                className="px-3 py-4 rounded-lg border border-gray-300"
                            />
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="px-3 py-4 rounded-lg border border-gray-300"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="px-3 py-4 rounded-lg border border-gray-300"
                            />
                            <input
                                type="tel"
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
                                inputMode="numeric"
                                // pattern="[\d()+-]{10,15}"
                                placeholder="Phone Number"
                                required
                                className="px-3 py-4 rounded-lg border border-gray-300"
                            />
                            <button
                                type="submit"
                                className="bg-[#F55266] hover:bg-[#f55265c8] px-3 py-4 rounded-lg text-lg font-semibold"
                            >
                                Create an account
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

export default SignUp;