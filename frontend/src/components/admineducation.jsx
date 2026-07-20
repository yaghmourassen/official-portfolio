import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllEducation, createEducation, updateEducation, deleteEducation } from '../services/education';

export default function AdminEducation() {
    const [educations, setEducations] = useState([]);
    const [formData, setFormData] = useState({ years: '', degree: '', fieldOfStudy: '', school: '', certificateUrl: '' });
    const [file, setFile] = useState(null); // إضافة حالة للملف
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false); // إضافة حالة للتحميل

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

    // دالة رفع الصورة إلى Cloudinary
    const uploadToCloudinary = async (fileToUpload) => {
    const formData = new FormData();
    formData.append("file", fileToUpload);
    // استخدم الاسم الذي اخترته أنت في الخطوة 4
    formData.append("upload_preset", "my_portfolio_preset"); 
    
    const res = await axios.post(
        // استخدم الـ Cloud name الذي ظهر في صورتك
        "https://api.cloudinary.com/v1_1/dlrwrp487/image/upload", 
        formData
    );
    return res.data.secure_url;
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let finalData = { ...formData };

            // رفع الصورة إذا تم اختيار ملف جديد
            if (file) {
                const imageUrl = await uploadToCloudinary(file);
                finalData.certificateUrl = imageUrl;
            }

            if (editingId) {
                await updateEducation(editingId, finalData);
                setEditingId(null);
            } else {
                await createEducation(finalData);
            }
            
            setFormData({ years: '', degree: '', fieldOfStudy: '', school: '', certificateUrl: '' });
            setFile(null);
            loadEducation();
        } catch (error) {
            console.error("Failed to save record", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({ years: item.years, degree: item.degree, fieldOfStudy: item.fieldOfStudy, school: item.school, certificateUrl: item.certificateUrl });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteEducation(id);
                loadEducation();
            } catch (error) {
                console.error("Failed to delete", error);
            }
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-10">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Education' : 'Add New Education'}</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <input type="text" name="years" placeholder="Years" value={formData.years} onChange={handleChange} required className="p-2 border rounded"/>
                <input type="text" name="degree" placeholder="Degree" value={formData.degree} onChange={handleChange} required className="p-2 border rounded"/>
                <input type="text" name="fieldOfStudy" placeholder="Field of Study" value={formData.fieldOfStudy} onChange={handleChange} required className="p-2 border rounded"/>
                <input type="text" name="school" placeholder="School" value={formData.school} onChange={handleChange} required className="p-2 border rounded"/>
                
                {/* حقل رفع الملف */}
                <div className="md:col-span-2">
                    <label className="block text-sm mb-1">Upload Certificate:</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} className="p-2 border rounded w-full" />
                </div>

                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    {loading ? 'Processing...' : (editingId ? 'Update Record' : 'Add Record')}
                </button>
            </form>

            <div className="space-y-4">
                {educations.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 border rounded bg-gray-50">
                        <div>
                            <p className="font-bold">{item.degree} ({item.years})</p>
                            <p className="text-sm text-gray-600">{item.fieldOfStudy} at {item.school}</p>
                            {item.certificateUrl && <a href={item.certificateUrl} target="_blank" className="text-xs text-blue-500 underline">View Certificate</a>}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(item)} className="text-blue-600">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="text-red-600">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}