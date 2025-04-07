import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Progress from Ant Design for client-side rendering
const Progress = dynamic(() => import('antd').then(mod => mod.Progress), { ssr: false });

const HabitCard = ({ title, progress, onClick }) => {
    return (
        <div className="p-6 m-4 bg-white shadow-lg rounded-xl flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            {progress !== undefined && (
                <div className="w-full mb-4">
                    <Progress percent={progress} status={progress === 100 ? 'success' : 'active'} />
                    <p className="text-gray-500 text-sm text-center mt-1">{progress}% completed</p>
                </div>
            )}
            <button 
                onClick={onClick} 
                className="mt-3 bg-blue-600 text-white font-semibold py-2 px-5 rounded-full hover:bg-blue-700 transition"
            >
                Update Habit
            </button>
        </div>
    );
};

export default HabitCard;
