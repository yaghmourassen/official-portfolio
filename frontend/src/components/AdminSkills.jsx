import React, { useState, useEffect } from 'react';
import { getSkills, addSkill, deleteSkill } from '../services/skills';

const ALLOWED_CATEGORIES = [
    'Programming Languages',
    'Frameworks',
    'Libraries',
    'DevOps',
    'Securities'
];

// 1. Primary Mapping for essential skills, JWT, and Network/Security concepts
const FEATURED_ICON_MAP = {
    // Core Languages & Web
    'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'html': 'https://api.iconify.design/logos/html-5.svg',
    'html5': 'https://api.iconify.design/logos/html-5.svg',
    'css': 'https://api.iconify.design/logos/css-3.svg',
    'javascript': 'https://api.iconify.design/logos/javascript.svg',
    'php': 'https://api.iconify.design/logos/php.svg',
    'python': 'https://api.iconify.design/logos/python.svg',

    // Security, Authentication & Networking Concepts
    'jwt': 'https://api.iconify.design/logos/jwt-icon.svg',
    'jsonwebtoken': 'https://api.iconify.design/logos/jwt-icon.svg',
    'firewall': 'https://api.iconify.design/fa6-solid/shield-halved.svg',
    'firewalls': 'https://api.iconify.design/fa6-solid/shield-halved.svg',
    'acl': 'https://api.iconify.design/fa6-solid/user-lock.svg',
    'vlan': 'https://api.iconify.design/fa6-solid/diagram-project.svg',
    'vpn': 'https://api.iconify.design/fa6-solid/network-wired.svg',
    'ciscopackettracer': 'https://api.iconify.design/logos/cisco.svg',
    'packettracer': 'https://api.iconify.design/logos/cisco.svg',
    'ids': 'https://api.iconify.design/fa6-solid/shield-cat.svg',
    'ips': 'https://api.iconify.design/fa6-solid/shield-cat.svg',
    'wireshark': 'https://api.iconify.design/logos/wireshark.svg',
    'kali': 'https://api.iconify.design/logos/kali-linux.svg',
    'kalilinux': 'https://api.iconify.design/logos/kali-linux.svg'
};

// Generates unique HSL colors per skill string to give secondary fallback badges distinct designs
const getUniqueBadgeStyle = (str = '') => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return {
        backgroundColor: `hsl(${hue}, 65%, 92%)`,
        color: `hsl(${hue}, 75%, 28%)`,
        borderColor: `hsl(${hue}, 55%, 78%)`
    };
};

const getShortLabel = (text) => {
    if (!text) return 'SK';
    const cleanText = text.trim();
    const words = cleanText.split(/[\s\-_]+/);
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
    return cleanText.slice(0, 3).toUpperCase();
};

/**
 * Dynamic Skill Icon Component
 * 1. Checks FEATURED_ICON_MAP (Java, JWT, Firewalls, ACL, VLAN, VPN...).
 * 2. Attempts CDN fetch from SimpleIcons.
 * 3. Falls back to a dynamic text badge with a unique color scheme per skill.
 */
const SkillIcon = ({ iconName, title, size = 26 }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(false);
    }, [iconName, title]);

    const slug = (iconName || title || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    // Fallback: Distinctly styled badge with unique background/text colors
    if (hasError || !slug) {
        const label = getShortLabel(title || iconName);
        const style = getUniqueBadgeStyle(title || iconName);
        return (
            <div
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: `${Math.max(9, size / 2.3)}px`,
                    fontWeight: '700',
                    border: `1px solid ${style.borderColor}`,
                    backgroundColor: style.backgroundColor,
                    color: style.color,
                    userSelect: 'none',
                    flexShrink: 0
                }}
                title={title || iconName}
            >
                {label}
            </div>
        );
    }

    // Determine target URL
    const targetUrl = FEATURED_ICON_MAP[slug] || `https://cdn.simpleicons.org/${slug}`;

    return (
        <img
            src={targetUrl}
            alt={title || iconName}
            style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', flexShrink: 0 }}
            onError={() => setHasError(true)}
        />
    );
};

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

    const handleTitleChange = (e) => {
        const val = e.target.value;
        const generatedSlug = val.toLowerCase().replace(/[\s\.\-]+/g, '');
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
                    onChange={(e) => setFormData({ ...formData, categoryTitle: e.target.value })}
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
                    placeholder="e.g. JWT, Java, Firewalls, ACL, VLAN, VPN"
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />

                <label style={{ fontWeight: 'bold' }}>Icon Slug (Auto-generated or custom)</label>
                <input
                    type="text"
                    placeholder="e.g. jwt, java, firewall, acl, vlan, vpn"
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value.toLowerCase() })}
                    required
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />

                {/* Dynamic Preview */}
                {formData.title && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <span style={{ fontSize: '0.9rem', color: '#475569' }}>Icon Preview:</span>
                        <SkillIcon iconName={formData.iconName} title={formData.title} size={28} />
                    </div>
                )}

                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                            <SkillIcon iconName={skill.iconName} title={skill.title} size={22} />
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