import { FaListUl, FaRegHeart } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Profile = () => {
    const searchParams = useSearchParams();
    const emailParameter = searchParams.get('email');

    const [user, setUser] = useState(null);

    // Current input values
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [hasSaved, setHasSaved] = useState(false);

    // Original values for comparison
    const [original, setOriginal] = useState({ fullname: '', email: '', phonenumber: '' });
    useEffect(() => {
        async function loadProfile() {
            try {
                const currentPort = window.location.port || 3000;
                const currentHost = window.location.hostname || 'localhost';
                const currentProtocol = window.location.protocol || 'http:';
                const baseUrl = `${currentProtocol}//${currentHost}:${currentPort}`;

                const response = await fetch(`${baseUrl}/api/user?email=${emailParameter}`);
                const data = await response.json();

                setUser(data);
                setFullname(data.fullname || '');
                setEmail(data.email || '');
                setPhonenumber(data.phonenumber || '');

                setOriginal({
                    fullname: data.fullname || '',
                    email: data.email || '',
                    phonenumber: data.phonenumber || '',
                });
            } catch (error) {
                console.error('Failed to load profile:', error);
            }
        }

        if (emailParameter) {
            loadProfile();
        }
    }, [emailParameter]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform validation and send data to the backend
        const updatedUser = {
            fullname,
            email,
            phonenumber,
        };
        console.log(updatedUser);
        const res = await fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser),
        });
        const data = await res.json();
        alert(data.message || data.error || 'No response message');
        setHasSaved(true);
    };

    // Determine if inputs have changed
    const isChanged =
        fullname !== original.fullname ||
        email !== original.email ||
        phonenumber !== original.phonenumber;

    if (!user) {
        return <div className="mt-10 text-center text-gray-400">Loading profile...</div>;
    }

    return (
        <div className="mx-5 max-w-6xl p-10 xl:mx-auto">
            <div className="grid grid-cols-4 gap-4">
                <div className="avatar">
                    <div className="flex h-28 w-[120px] items-center justify-center rounded-full bg-[#6d7275]">
                        <Image src="/placeholder.png" alt="placeholder" />
                    </div>
                </div>
                <div className="col-span-3">
                    <p className="mr-2 text-2xl text-gray-400">Account Details:</p>

                    <div className="flex flex-col pt-3">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col space-y-4 lg:space-y-3"
                        >
                            <input
                                type="text"
                                className="mr-2 text-lg font-semibold text-gray-700"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                            <input
                                type="text"
                                className="mr-2 text-lg font-semibold text-gray-700"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                className="mr-2 text-lg font-semibold text-gray-700"
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
                            />
                            {isChanged && !hasSaved && (
                                <button
                                    type="submit"
                                    className="mt-4 w-fit rounded bg-[#F55266] px-4 py-2 text-white hover:bg-[#d64456]"
                                >
                                    Save Changes
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <hr className="border-grey-500 mt-6" />
            <div className="mt-[1.5px] flex justify-center gap-20">
                <button className="flex items-center gap-1 border-t border-gray-800 py-8 text-sm font-semibold text-gray-500 hover:text-white">
                    <FaListUl /> Your listings
                </button>
                <Link href={`/wishlist?email=${email}`}>
                    <button className="flex items-center gap-1 border-t border-gray-800 py-8 text-sm font-semibold text-gray-500 hover:text-white">
                        <FaRegHeart /> Wishlist
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Profile;
