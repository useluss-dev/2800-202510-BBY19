'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ItemCard from './ItemCard';

function Profile() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [original, setOriginal] = useState({ fullname: '', email: '', phonenumber: '' });
    const [hasSaved, setHasSaved] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
            return;
        }
        if (status !== 'authenticated') return;

        async function loadProfile() {
            try {
                const res = await fetch(
                    `/api/user?email=${encodeURIComponent(session.user.email)}`,
                );
                const data = await res.json();
                setUser(data);
                setFullname(data.fullname || '');
                setEmail(data.email || '');
                setPhonenumber(data.phonenumber || '');
                setOriginal({
                    fullname: data.fullname || '',
                    email: data.email || '',
                    phonenumber: data.phonenumber || '',
                });
            } catch (err) {
                console.error('Failed to load profile:', err);
            }
        }
        loadProfile();
    }, [status, session, router]);

    useEffect(() => {
        if (status !== 'authenticated') return;

        async function loadListings() {
            try {
                const res = await fetch('/api/listings');
                const all = await res.json();
                setProducts(all.filter((l) => l.posterId === session.user.id));
            } catch (err) {
                console.error('Failed to load listings:', err);
            }
        }
        loadListings();
    }, [status, session]);

    const isChanged =
        fullname !== original.fullname ||
        email !== original.email ||
        phonenumber !== original.phonenumber;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullname, email, phonenumber }),
        });
        const result = await res.json();
        alert(result.message || result.error || 'No response message');
        setHasSaved(true);
    };

    if (!user) {
        return <div className="mt-10 text-center text-gray-400">Loading profile...</div>;
    }

    return (
        <div className="w-full p-6 md:p-10 lg:mx-auto lg:max-w-7xl">
            {/* Header */}
            <div className="flex items-center gap-6 px-2 md:px-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F55266] text-3xl font-bold text-white">
                    {fullname.charAt(0)}
                </div>
                <div>
                    <h1 className="text-2xl font-semibold text-[#F55266]">{fullname}</h1>
                    <p className="mt-1 text-gray-600">Manage your account details</p>
                </div>
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Account Form */}
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-6 px-2 md:grid-cols-2 md:px-0"
            >
                <div>
                    <label className="mb-1 block text-sm font-medium text-[#F55266]">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>
                <div>
                    <label className="0 mb-1 block text-sm font-medium text-[#F55266]">
                        Email Address
                    </label>
                    <input
                        type="email"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-[#F55266]">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                    />
                </div>
                <div className="flex justify-end px-2 md:col-span-2 md:px-0">
                    {isChanged && !hasSaved && (
                        <button
                            type="submit"
                            className="rounded-full bg-[#F55266] px-6 py-2 font-semibold text-white transition hover:bg-[#d64456]"
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            </form>

            <hr className="my-6 border-gray-300" />

            {/* Product Grid */}
            <h2 className="pl-2 text-2xl font-bold">Your listings</h2>
            <div className="grid-col-1 mt-6 grid gap-6 pl-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.length > 0 ? (
                    products.map((item) => (
                        <ItemCard key={item.id || item._id} {...item} prod={item} />
                    ))
                ) : (
                    <p className="text-gray-300">No listings found.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
