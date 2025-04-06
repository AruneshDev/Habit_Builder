import React from 'react';
import { signIn } from 'next-auth/react';

function Login() {
    return (
        <div 
            className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url('/assets/Believe.png')`,  // Fullscreen background
                backgroundSize: 'cover',  // Ensures the image covers the screen
                backgroundPosition: 'center',  // Centers the image
            }}
        >
            <button 
                onClick={() => signIn('google')} 
                className="bg-blue-500 text-white text-2xl font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition shadow-lg"
            >
                Sign Up to Start
            </button>
        </div>
    );
}

export default Login;
