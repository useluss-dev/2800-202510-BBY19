import Logo from '../assets/images/ReCompute.png';
import Image from 'next/image';
import DropDown from './CategoryDropdown';
import { RiVisaLine, RiPaypalFill, RiMastercardFill } from 'react-icons/ri';
import { FaGooglePay, FaApplePay } from 'react-icons/fa';

async function getGeoData() {
    const res = await fetch('http://ip-api.com/json/', {
        cache: 'no-store', // Ensures it's fetched on every request
    });
    return res.json();
}

export default async function Footer() {
    const geo = await getGeoData();

    return (
        <div className="fixed bottom-0 flex flex-col">
            <div className="flex items-center text-[#F55266]">
                <Image src={Logo} alt="Logo" className="flex w-1/6 justify-center lg:w-1/12" />
                ReCompute
            </div>
            <div className="w-screen">
                <div className="flex">
                    <DropDown />{' '}
                </div>
                <a className="flex w-3 p-4 lg:hover:text-gray-400" href="/profile">
                    Profile
                </a>
                {geo?.city && (
                    <p className="px-4 text-sm text-gray-300">
                        You&apos;re browsing from {geo.city}, {geo.country}
                    </p>
                )}
                <div className="flex flex-row justify-center gap-4 border-t-2 border-gray-700 p-4 md:justify-start">
                    <RiVisaLine className="h-7 w-7" />
                    <RiPaypalFill className="h-7 w-7" />
                    <RiMastercardFill className="h-7 w-7" />
                    <FaGooglePay className="h-9 w-9" />
                    <FaApplePay className="h-9 w-9" />
                </div>
            </div>
        </div>
    );
}
