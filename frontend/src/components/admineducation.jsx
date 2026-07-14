import React, { useState, useEffect } from 'react';
import { getAllEducation, createEducation, updateEducation, deleteEducation } from '../services/education';

export default function AdminEducation() {
    const [educations, setEducations] = useState([]);
    const [formData, setFormData] = useState({ years: '', degree: '', fieldOfStudy: '', school: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadEducation();
    }, []);

    const loadEducation = async () => {
        try {
            const data = await getAllEducation();
            setEducations(data);
        } catch (error) {
            console.error("Failed to load records", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateEducation(editingId, formData);
                setEditingId(null);
            } else {
                await createEducation(formData);
            }
            setFormData({ years: '', degree: '', fieldOfStudy: '', school: '' });
            loadEducation();
        } catch (error) {
            console.error("Failed to save record", error);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({ years: item.years, degree: item.degree, fieldOfStudy: item.fieldOfStudy, school: item.school });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this education item?")) {
            try {
                await deleteEducation(id);
                loadEducation();
            } catch (error) {
                console.error("Failed to delete record", error);
            }
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-10">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Education' : 'Add New Education'}</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <input 
                    type="text" name="years" placeholder="Years (e.g. 2021 - 2023)" 
                    value={formData.years} onChange={handleChange} required 
                    className="p-2 border rounded"
                />
                <input 
                    type="text" name="degree" placeholder="Degree (e.g. Master's Degree)" 
                    value={formData.degree} onChange={handleChange} required 
                    className="p-2 border rounded"
                />
                <input 
                    type="text" name="fieldOfStudy" placeholder="Field of Study (e.g. Computer Science)" 
                    value={formData.fieldOfStudy} onChange={handleChange} required 
                    className="p-2 border rounded"
                />
                <input 
                    type="text" name="school" placeholder="School (e.g. University Name)" 
                    value={formData.school} onChange={handleChange} required 
                    className="p-2 border rounded"
                />
                <div className="md:col-span-2 flex gap-2">
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                        {editingId ? 'Update Record' : 'Add Record'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={() => { setEditingId(null); setFormData({ years: '', degree: '', fieldOfStudy: '', school: '' }); }} className="bg-gray-500 text-white px-6 py-2 rounded">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <hr className="my-6" />

            <h3 className="text-xl font-semibold mb-4">Existing Education Records</h3>
            <div className="space-y-4">
                {educations.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 border rounded bg-gray-50">
                        <div>
                            <p className="font-bold">{item.degree} ({item.years})</p>
                            <p className="text-sm text-gray-600">{item.fieldOfStudy} at {item.school}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}