import React from 'react';
import { signIn } from 'next-auth/react';

function Login() {
    return (
        <div 
            className="h-screen w-screen flex items-center justify-center"
            style={{
                backgroundImage: `url('/assets/Believe.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <button 
                onClick={() => signIn()} 
                className="bg-red-600 text-white text-2xl font-bold py-3 px-6 rounded-full hover:bg-red-700 transition"
            >
                Sign Up to Start
            </button>
        </div>
    );
}

export default Login;
