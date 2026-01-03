import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Canlıya geçince burayı değiştirecem

axios.defaults.baseURL = 'http://localhost:3000/api'; // Backend adresi

export const fetchDailyRate = createAsyncThunk(
  'diet/fetchDailyRate',
  async (userData, thunkAPI) => {
    try {
      const payload = {
        height: Number(userData.height),
        age: Number(userData.age),
        currentWeight: Number(userData.weight),
        desiredWeight: Number(userData.desiredWeight),
        bloodType: Number(userData.bloodType),
      };

      const response = await axios.post('/user/daily-calory-needs', payload);
      // Backend yanıtı: { status: 200, message: '...', data: { dailyRate, notAllowedProducts } }
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);