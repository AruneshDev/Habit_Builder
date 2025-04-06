import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import '../styles/globals.css';

function Auth({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Handle loading state
    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    // If the user is not authenticated and not on the login page, redirect to login
    if (!session && router.pathname !== '/login') {
        if (typeof window !== 'undefined') {
            router.push('/login');
        }
        return null;
    }

    // If authenticated and on the login page, redirect to the home page
    if (session && router.pathname === '/login') {
        if (typeof window !== 'undefined') {
            router.replace('/');
        }
        return null;
    }

    return children;
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Auth>
                <Component {...pageProps} />
            </Auth>
        </SessionProvider>
    );
}

export default MyApp;
