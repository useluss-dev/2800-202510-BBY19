'use client';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <CartProvider>
                {children}
                <ToastContainer position="top-right" autoClose={3000} />
            </CartProvider>
        </SessionProvider>
    );
}
