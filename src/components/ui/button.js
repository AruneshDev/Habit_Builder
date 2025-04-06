import React from 'react';

export function Button({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition"
            style={{ width: '280px', height: '50px' }}
        >
            <img 
                src="/assets/google-icon.png" 
                alt="Google" 
                className="w-6 h-6 mr-2" 
            />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>
    );
}
