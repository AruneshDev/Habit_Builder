import React, { useState } from 'react';
import HabitCard from '../components/HabitCard';
import Navbar from '../components/Navbar';
import AddHabitModal from '../components/AddHabitModal';
import ProfileCard from '../components/ProfileCard';

const HabitDashboard = () => {
    const [habits, setHabits] = useState([
        { title: 'Exercise', progress: 40 },
        { title: 'Read', progress: 60 },
        { title: 'Meditate', progress: 20 },
    ]);
    const [showModal, setShowModal] = useState(false);

    const updateHabit = (index) => {
        const newHabits = [...habits];
        newHabits[index].progress = Math.min(100, newHabits[index].progress + 20);
        setHabits(newHabits);
    };

    const addHabit = (name) => {
        setHabits([...habits, { title: name, progress: 0 }]);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar onSignOut={() => console.log('Sign Out')} />
            <div className="p-8">
                <ProfileCard user={{ name: 'John Doe', image: '/profile.jpg', streak: 5 }} />
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {habits.map((habit, index) => (
                        <HabitCard 
                            key={index} 
                            title={habit.title} 
                            progress={habit.progress} 
                            onClick={() => updateHabit(index)} 
                        />
                    ))}
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="fixed bottom-5 right-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                >
                    + Add Habit
                </button>
                {showModal && <AddHabitModal onAddHabit={addHabit} onClose={() => setShowModal(false)} />}
            </div>
        </div>
    );
};

export default HabitDashboard;
