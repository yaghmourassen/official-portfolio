import axios from 'axios';
import API_URL from './api';

export const getAllEducation = async () => {
    const response = await axios.get(`${API_URL}/education`);
    return response.data;
};

export const createEducation = async (data) => {
    const response = await axios.post(`${API_URL}/education`, data);
    return response.data;
};

export const updateEducation = async (id, data) => {
    const response = await axios.put(`${API_URL}/education/${id}`, data);
    return response.data;
};

export const deleteEducation = async (id) => {
    const response = await axios.delete(`${API_URL}/education/${id}`);
    return response.data;
};