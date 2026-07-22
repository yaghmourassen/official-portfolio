import React, { useState, useEffect } from 'react';
import { getSkills, addSkill, deleteSkill } from '../services/skills';

const ALLOWED_CATEGORIES = [
    'Programming Languages',
    'Frameworks',
    'Libraries',
    'DevOps',
    'Securities'
];

function AdminSkills() {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({
        categoryTitle: ALLOWED_CATEGORIES[0],
        title: '',
        description: '',
        iconName: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await getSkills();
            setSkills(res.data || res);
        } catch (err) {
            setError('Failed to load skills');
        }
    };

    // Automatically convert typed skill name to a standard SimpleIcons slug
    const handleTitleChange = (e) => {
        const val = e.target.value;
        const generatedSlug = val.toLowerCase().replace(/[\s\.\-]+/g, ''); // "Node.js" -> "nodejs"
        setFormData({
            ...formData,
            title: val,
            iconName: generatedSlug
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await addSkill(formData);
            setFormData({ 
                categoryTitle: ALLOWED_CATEGORIES[0], 
                title: '', 
                description: '', 
                iconName: '' 
            });
            fetchSkills();
        } catch (err) {
            setError(err.message || 'Failed to add skill');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            try {
                await deleteSkill(id);
                fetchSkills();
            } catch (err) {
                setError('Failed to delete skill');
            }
        }
    };

    return (
        <div className="admin-skills-section" style={{ padding: '30px', background: '#fff', borderRadius: '12px' }}>
            <h2>Manage Skills Section</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '450px' }}>
                <label style={{ fontWeight: 'bold' }}>Category</label>
                <select 
                    value={formData.categoryTitle} 
                    onChange={(e) => setFormData({...formData, categoryTitle: e.target.value})}
                    required
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                    {ALLOWED_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <label style={{ fontWeight: 'bold' }}>Skill Title</label>
                <input 
                    type="text" 
                    placeholder="Type skill name (e.g. Node.js, Express, Docker)" 
                    value={formData.title} 
                    onChange={handleTitleChange}
                    required
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />

                <label style={{ fontWeight: 'bold' }}>Icon Slug (Auto-generated or custom)</label>
                <input 
                    type="text" 
                    placeholder="e.g. nodedotjs, express, docker" 
                    value={formData.iconName} 
                    onChange={(e) => setFormData({...formData, iconName: e.target.value.toLowerCase()})}
                    required
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />

                {/* Dynamic Icon Preview */}
                {formData.iconName && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <span>Icon Preview:</span>
                        <img 
                            src={`https://cdn.simpleicons.org/${formData.iconName}`} 
                            alt="Live Preview" 
                            style={{ width: '28px', height: '28px' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                            onLoad={(e) => { e.target.style.display = 'block'; }}
                        />
                    </div>
                )}

                <textarea 
                    placeholder="Description" 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />

                <button type="submit" disabled={loading} style={{ padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    {loading ? 'Adding...' : 'Add New Skill'}
                </button>
            </form>

            <h3>Existing Skills List</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '600px' }}>
                {skills.map((skill) => (
                    <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img 
                                src={`https://cdn.simpleicons.org/${skill.iconName}`} 
                                alt={skill.title} 
                                style={{ width: '20px', height: '20px' }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <strong>{skill.categoryTitle}</strong> &gt; {skill.title} <span style={{ color: '#666', fontSize: '0.85rem' }}>({skill.iconName})</span>
                        </div>
                        <button onClick={() => handleDelete(skill.id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminSkills;