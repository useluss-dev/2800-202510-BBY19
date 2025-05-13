'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/signup';

    return (
        <>
            {!isAuthPage && <Header />}
            <main>{children}</main>
            {/* {!isAuthPage && <Footer />} */}
        </>
    );
}
