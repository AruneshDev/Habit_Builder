import React from 'react';
import { signIn } from 'next-auth/react';

function Login() {
    return (
        <div 
            className="h-screen w-screen flex items-center justify-center bg-cover bg-center relative"
            style={{
                backgroundImage: "url('/assets/Believe.png')",  // Correct path for public folder
                backgroundSize: 'cover',       // Ensure the image covers the entire area
                backgroundRepeat: 'no-repeat', // Prevent image repetition
                backgroundPosition: 'center',  // Keep the image centered
                height: '100vh',               // Full viewport height
                width: '100vw',                // Full viewport width
            }}
        >
            <div className="absolute inset-0 flex items-center justify-center z-10">
            <button onClick={() => signIn('google', { callbackUrl: '/' })} 
            className="bg-blue-500 text-white text-2xl font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition shadow-lg"
            >
                Login to Start
            </button>

            </div>
            <div className="absolute inset-0 bg-black opacity-30"></div>  {/* Optional overlay */}
        </div>
    );
}

export default Login;
