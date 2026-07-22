import React, { useState, useEffect } from 'react';
import { getSkills, addSkill, deleteSkill } from '../services/skills';

const ALLOWED_CATEGORIES = [
    'Programming Languages',
    'Frameworks',
    'Libraries',
    'DevOps',
    'Securities'
];

// List of available icons for selection
const AVAILABLE_ICONS = [
    { label: 'Node.js (FaNodeJs)', value: 'FaNodeJs' },
    { label: 'React (FaReact)', value: 'FaReact' },
    { label: 'JavaScript (FaJs)', value: 'FaJs' },
    { label: 'Java (FaJava)', value: 'FaJava' },
    { label: 'Python (FaPython)', value: 'FaPython' },
    { label: 'HTML5 (FaHtml5)', value: 'FaHtml5' },
    { label: 'CSS3 (FaCss3Alt)', value: 'FaCss3Alt' },
    { label: 'Laravel (FaLaravel)', value: 'FaLaravel' },
    { label: 'Docker (FaDocker)', value: 'FaDocker' },
    { label: 'Git (FaGitAlt)', value: 'FaGitAlt' },
    { label: 'GitHub (FaGithub)', value: 'FaGithub' },
    { label: 'Spring Boot (SiSpringboot)', value: 'SiSpringboot' },
    { label: 'MongoDB (SiMongodb)', value: 'SiMongodb' },
    { label: 'MySQL (SiMysql)', value: 'SiMysql' },
    { label: 'Flutter (SiFlutter)', value: 'SiFlutter' },
    { label: 'Firebase (SiFirebase)', value: 'SiFirebase' },
    { label: 'Tailwind CSS (SiTailwindcss)', value: 'SiTailwindcss' },
    { label: 'Express.js (SiExpress)', value: 'SiExpress' },
    { label: 'Security Shield (FaShieldAlt)', value: 'FaShieldAlt' },
    { label: 'Security Lock (FaLock)', value: 'FaLock' }
];

function AdminSkills() {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({
        categoryTitle: ALLOWED_CATEGORIES[0],
        title: '',
        description: '',
        iconName: AVAILABLE_ICONS[0].value
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
                iconName: AVAILABLE_ICONS[0].value 
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
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <input 
                    type="text" 
                    placeholder="Skill Title (e.g. Node.js)" 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                
                <textarea 
                    placeholder="Description" 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />

                <label style={{ fontWeight: 'bold' }}>Select Icon</label>
                <select 
                    value={formData.iconName} 
                    onChange={(e) => setFormData({...formData, iconName: e.target.value})}
                    required
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                    {AVAILABLE_ICONS.map((icon) => (
                        <option key={icon.value} value={icon.value}>
                            {icon.label}
                        </option>
                    ))}
                </select>

                <button type="submit" disabled={loading} style={{ padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    {loading ? 'Adding...' : 'Add New Skill'}
                </button>
            </form>

            <h3>Existing Skills List</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '600px' }}>
                {skills.map((skill) => (
                    <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <div>
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