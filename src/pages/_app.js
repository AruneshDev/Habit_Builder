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

    // Avoid redirect loop: Check if the current path is already '/login'
    if (!session) {
        if (router.pathname !== '/login') {
            router.push('/login');
            return null;
        }
    } else {
        // If authenticated and already on the login page, redirect to home
        if (router.pathname === '/login') {
            router.push('/');
            return null;
        }
    }

    return children;
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;
