'use client';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '../context/CartContext';

export default function ClientProviders({ children }) {
    return (
        <SessionProvider>
            <CartProvider>{children}</CartProvider>
        </SessionProvider>
    );
}
