import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHabits = async (user) => {
  const response = await api.get(`/habits?user=${user}`);
  return response.data;
};

export const addHabit = async (habit) => {
  const response = await api.post('/habits', habit);
  return response.data;
};

export const updateHabit = async (index, habit) => {
  const response = await api.put(`/habits/${index}`, habit);
  return response.data;
};

export const updateStreak = async (user, streak, date) => {
  const response = await api.post('/updateStreak', { user, streak, date });
  return response.data;
};

export const uploadProfilePic = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default api;
