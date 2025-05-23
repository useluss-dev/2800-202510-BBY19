import React from 'react';
import ShippingInfo from './components/ShippingInfo';
import NewArrivals from './components/NewArrivals';
import Hero from './components/Hero';

export default function Home() {
    return (
        <div>
            <main className="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8">
                <Hero />
                <ShippingInfo />
                <NewArrivals />
            </main>
        </div>
    );
}
