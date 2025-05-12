import Logo from '../assets/images/ReCompute.png';
import Image from 'next/image';
import Link from 'next/link';

async function getGeoData() {
    const res = await fetch('http://ip-api.com/json/', {
        cache: 'no-store', // Ensures it's fetched on every request
    });
    return res.json();
}

export default async function Footer() {
    const geo = await getGeoData();

    return (
        <div className="flex flex-col px-4">
            <div className="flex items-center text-xl font-bold">
                <Image src={Logo} width={75} height={75} alt="Logo" />
                ReCompute
            </div>
            <div className="">
                <Link className="flex w-3 p-4 lg:hover:text-gray-400" href="/profile">
                    <h3 className="text-lg font-semibold">Profile</h3>
                </Link>
                {geo?.city && (
                    <p className="px-4 pb-4 text-lg font-semibold text-gray-300">
                        You&apos;re browsing from {geo.city}, {geo.country}
                    </p>
                )}
                <div className="flex flex-row justify-center gap-6 border-t-2 border-gray-700 p-4 md:justify-center">
                    <Image src="/visa.png" width={50} height={50} alt="Visa" />
                    <Image src="/mastercard.png" width={50} height={50} alt="Mastercard" />
                    <Image src="/gPay.png" width={50} height={50} alt="Google Pay" />
                    <Image
                        src="/aPay.png"
                        width={50}
                        height={50}
                        alt="Apple Pay"
                        className="invert"
                    />
                </div>
            </div>
        </div>
    );
}
