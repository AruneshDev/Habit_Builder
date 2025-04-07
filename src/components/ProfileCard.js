import React from 'react';

const ProfileCard = ({ user }) => {
    return (
        <div className="p-4 m-2 bg-gray-800 text-white rounded-lg shadow-md">
            <h3 className="text-xl">Hello, {user.name}!</h3>
            <p className="text-sm">Streak: {user.streak} days</p>
            <img src={user.image} alt="Profile" className="w-16 h-16 rounded-full mt-2" />
        </div>
    );
};

export default ProfileCard;
