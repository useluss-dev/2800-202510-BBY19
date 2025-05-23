'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import loginImage from '../assets/images/login.svg';
import logo from '../assets/images/ReCompute.png';
import Link from 'next/link';
import { FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

function Login() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Redirect as soon as we're authenticated
    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/profile');
        }
    }, [status, session, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (!res.ok) {
            setError('Invalid email or password');
            console.log(error);
        }
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
                            Sign in to your account
                        </h1>
                        <p className="pb-4 text-gray-500">
                            I don&apos;t have an account yet{' '}
                            <Link href={'/signup'}>
                                <span className="underline underline-offset-2">Sign up</span>
                            </Link>{' '}
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col space-y-4 lg:space-y-3"
                        >
                            <input
                                type="text"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="rounded-lg border border-gray-300 px-3 py-4"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="rounded-lg border border-gray-300 px-3 py-4"
                            />
                            <button
                                type="submit"
                                className="rounded-lg bg-[#F55266] px-3 py-4 text-lg font-semibold hover:bg-[#f55265c8]"
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
                                    className="flex items-center gap-x-2 rounded-md border border-gray-300 px-4 py-2"
                                >
                                    <FaFacebookF />
                                    Facebook
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-x-2 rounded-md border border-gray-300 px-4 py-2"
                                >
                                    <FaGoogle />
                                    Google
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-x-2 rounded-md border border-gray-300 px-4 py-2"
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
                <Image src={loginImage} alt="Login" />
            </div>
        </div>
    );
}

export default Login;
