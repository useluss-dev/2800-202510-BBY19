'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import singupImage from '../assets/images/signup.svg';
import logo from '../assets/images/ReCompute.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function SignUp() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { fullname, email, password, phonenumber };
        // Perform validation and send data to the backend
        const user = {
            fullname: formData.fullname,
            email: formData.email,
            password: formData.password,
            phonenumber: formData.phonenumber,
        };
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        const data = await res.json();
        alert(data.message || data.error || 'No response message');
        router.push('/');
    };

    return (
        <div className="flex h-screen p-4 md:h-full md:pb-44 lg:items-start lg:pb-0">
            <div className="flex w-full flex-col lg:w-1/2">
                <div className="flex items-center">
                    <Image src={logo} alt="Logo" className="w-1/6 lg:w-1/12" />
                    <h1 className="text-2xl font-bold">ReCompute</h1>
                </div>
                <div className="flex flex-col items-center pt-20 lg:w-2/3 lg:pt-12">
                    <div className="w-full max-w-md">
                        <h1 className="w-full pb-4 text-left text-2xl font-bold lg:text-4xl">
                            Create an account
                        </h1>
                        <p className="pb-4 text-gray-500">
                            I already have an account{' '}
                            <Link href={'/login'}>
                                <span className="underline underline-offset-2">Sign in</span>
                            </Link>{' '}
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col space-y-4 lg:space-y-3"
                        >
                            <input
                                type="text"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                placeholder="Full Name"
                                required
                                className="rounded-lg border border-gray-300 px-3 py-4"
                            />
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="rounded-lg border border-gray-300 px-3 py-4"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="rounded-lg border border-gray-300 px-3 py-4"
                            />
                            <input
                                type="tel"
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
                                inputMode="numeric"
                                placeholder="Phone Number"
                                required
                                className="rounded-lg border border-gray-300 px-3 py-4"
                            />
                            <button
                                type="submit"
                                className="rounded-lg bg-[#F55266] px-3 py-4 text-lg font-semibold hover:bg-[#f55265c8]"
                            >
                                Create an account
                            </button>
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
