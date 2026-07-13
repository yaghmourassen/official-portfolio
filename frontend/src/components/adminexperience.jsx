// frontend/src/components/adminexperience.jsx
import React, { useState, useEffect } from 'react';
// استيراد الدوال بشكل صحيح
import { getAllExperiences, createExperience, updateExperience, deleteExperience } from '../services/experience';

const AdminExperience = () => {
    const [experiences, setExperiences] = useState([]);
    const [formData, setFormData] = useState({ title: '', company: '', duration: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadExperiences();
    }, []);

    const loadExperiences = async () => {
        try {
            const data = await getAllExperiences();
            setExperiences(data);
        } catch (err) {
            console.error("Failed to load experiences", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateExperience(editingId, formData);
            } else {
                await createExperience(formData);
            }
            setFormData({ title: '', company: '', duration: '', description: '' });
            setEditingId(null);
            loadExperiences();
        } catch (err) {
            console.error("Error saving experience", err);
        }
    };

    const handleEdit = (exp) => {
        setEditingId(exp.id);
        setFormData({ title: exp.title, company: exp.company, duration: exp.duration, description: exp.description });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this entry?")) {
            try {
                await deleteExperience(id);
                loadExperiences();
            } catch (err) {
                console.error("Error deleting experience", err);
            }
        }
    };

    return (
        <div className="admin-crud-container">
            <h3>Manage Experiences</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
                <input type="text" name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <button type="submit">{editingId ? 'Update' : 'Add'} Experience</button>
            </form>

            <ul>
                {experiences.map(exp => (
                    <li key={exp.id} style={{ marginBottom: '10px' }}>
                        <strong>{exp.title}</strong> at {exp.company} ({exp.duration})
                        <button onClick={() => handleEdit(exp)} style={{ marginLeft: '10px' }}>Edit</button>
                        <button onClick={() => handleDelete(exp.id)} style={{ marginLeft: '5px', color: 'red' }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminExperience;