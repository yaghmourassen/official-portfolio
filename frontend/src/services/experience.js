// frontend/src/services/experience.js

const BASE_URL = 'http://localhost:5000/api/experiences';

export const getAllExperiences = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch experiences');
    return await response.json();
};

export const createExperience = async (data) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create experience');
    return await response.json();
};

export const updateExperience = async (id, data) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update experience');
    return await response.json();
};

export const deleteExperience = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete experience');
    return await response.json();
};