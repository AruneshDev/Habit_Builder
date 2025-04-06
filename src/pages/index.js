import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import openai from '../utils/openai';

function HabitBuilder() {
    const { data: session, status } = useSession();
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [schedule, setSchedule] = useState('');
    const [streak, setStreak] = useState(0);
    const [lastCheckIn, setLastCheckIn] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;  // Wait for session to load
        if (!session) {
            router.push('/login');  // Redirect to login if not authenticated
        } else {
            axios.get(`/api/habits?user=${session.user.email}`).then((res) => {
                setHabits(res.data.habits);
                setStreak(res.data.streak);
                setLastCheckIn(res.data.lastCheckIn);
            });
        }
    }, [session, status]);

    const updateStreak = () => {
        const today = new Date().toLocaleDateString();
        if (lastCheckIn !== today) {
            setStreak(lastCheckIn ? streak + 1 : 1);
            setLastCheckIn(today);
            axios.post('/api/updateStreak', { user: session.user.email, streak: streak + 1, date: today });
        }
    };

    const addHabit = async () => {
        if (newHabit) {
            const newEntry = { name: newHabit, checked: false, user: session.user.email };
            await axios.post('/api/habits', newEntry);
            setHabits([...habits, newEntry]);
            setNewHabit('');
        }
    };

    const toggleHabit = async (index) => {
        const updatedHabit = { ...habits[index], checked: !habits[index].checked };
        await axios.put(`/api/habits/${index}`, updatedHabit);
        const updatedHabits = habits.map((habit, i) => (i === index ? updatedHabit : habit));
        setHabits(updatedHabits);
        updateStreak();
    };

    const generateSchedule = async () => {
        const habitList = habits.map(habit => habit.name).join(', ');
        const prompt = `Generate a daily schedule based on the following activities: ${habitList}.`;
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 150,
        });
        setSchedule(response.data.choices[0].text);
    };

    const handleProfilePic = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        await axios.post('/api/upload', formData);
        setProfilePic(URL.createObjectURL(file));
    };

    if (status === 'loading') return <div>Loading...</div>;

    return (
        <div className="p-4">
            {session ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">Habit Builder for {session.user.name}</h1>
                    <p>Current Streak: {streak} days</p>
                    <p>Last Check-In: {lastCheckIn}</p>
                    <img src={profilePic || session.user.image} alt="Profile" className="rounded-full w-20 h-20 mb-4" />
                    <input type="file" onChange={handleProfilePic} className="mb-4" />
                    <div className="mb-4">
                        <input 
                            type="text" 
                            value={newHabit} 
                            onChange={(e) => setNewHabit(e.target.value)}
                            placeholder="Add a new habit..." 
                            className="border p-2 rounded mr-2" 
                        />
                        <Button onClick={addHabit}>Add Habit</Button>
                    </div>
                    <Button onClick={generateSchedule} className="mb-4">Generate Schedule</Button>
                    <div>
                        <p>{schedule}</p>
                    </div>
                    <div>
                        {habits.map((habit, index) => (
                            <Card key={index} className="mb-2">
                                <CardContent className="flex justify-between items-center">
                                    <span>{habit.name}</span>
                                    <Button onClick={() => toggleHabit(index)}>
                                        {habit.checked ? '✓' : '☐'}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Button onClick={signOut} className="mt-4">Sign Out</Button>
                </>
            ) : (
                <Button onClick={() => signIn()} className="mt-4">Sign In</Button>
            )}
        </div>
    );
}

export default HabitBuilder;
