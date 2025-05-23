'use client';
import Profile from '../components/Profile';
import React, { Suspense } from 'react';

export default function ProfilePage() {
    return (
        <Suspense
            fallback={<div className="mt-10 text-center text-gray-400">Loading profile...</div>}
        >
            <div className="flex h-screen">
                <Profile />
            </div>
        </Suspense>
    );
}
