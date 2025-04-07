import React from 'react';

const Navbar = ({ onSignOut }) => {
    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold">Habit Builder</h1>
            <button 
                onClick={onSignOut}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
            >
                Sign Out
            </button>
        </div>
    );
};

export default Navbar;
