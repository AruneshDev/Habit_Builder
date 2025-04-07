import React, { useState } from 'react';

const AddHabitModal = ({ onAddHabit, onClose }) => {
    const [habitName, setHabitName] = useState('');

    const handleSubmit = () => {
        if (habitName.trim()) {
            onAddHabit(habitName);
            setHabitName('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4">Add New Habit</h2>
                <input 
                    type="text" 
                    placeholder="Habit Name" 
                    value={habitName} 
                    onChange={(e) => setHabitName(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button 
                        onClick={handleSubmit} 
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add
                    </button>
                    <button 
                        onClick={onClose} 
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddHabitModal;
