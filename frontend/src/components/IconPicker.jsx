import React, { useState } from 'react';

// Popular tech stack slugs on SimpleIcons CDN
const POPULAR_TECHS = [
    { name: 'Node.js', slug: 'nodedotjs' },
    { name: 'Express.js', slug: 'express' },
    { name: 'React', slug: 'react' },
    { name: 'JavaScript', slug: 'javascript' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'Python', slug: 'python' },
    { name: 'Java', slug: 'java' },
    { name: 'Spring Boot', slug: 'springboot' },
    { name: 'Laravel', slug: 'laravel' },
    { name: 'Docker', slug: 'docker' },
    { name: 'Git', slug: 'git' },
    { name: 'GitHub', slug: 'github' },
    { name: 'MongoDB', slug: 'mongodb' },
    { name: 'MySQL', slug: 'mysql' },
    { name: 'PostgreSQL', slug: 'postgresql' },
    { name: 'Tailwind CSS', slug: 'tailwindcss' },
    { name: 'Flutter', slug: 'flutter' },
    { name: 'Firebase', slug: 'firebase' },
    { name: 'Linux', slug: 'linux' }
];

function IconPicker({ selectedSlug, onSelectIcon }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter available icons live as you type
    const filteredIcons = POPULAR_TECHS.filter(tech =>
        tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // If the typed search term doesn't match predefined ones, allow raw slug input
    const customSlug = searchTerm.trim().toLowerCase().replace(/\s+/g, '');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>Search or Type Tech Icon:</label>
            
            <input 
                type="text"
                placeholder="Type 'node.js', 'express', etc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />

            {/* Selected Icon Live Preview */}
            {selectedSlug && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '6px' }}>
                    <img 
                        src={`https://cdn.simpleicons.org/${selectedSlug}`} 
                        alt="Selected Preview" 
                        style={{ width: '30px', height: '30px' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span>Selected Icon Slug: <strong>{selectedSlug}</strong></span>
                </div>
            )}

            {/* Live Search Grid Results */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '8px', maxHeight: '180px', overflowY: 'auto', border: '1px solid #eee', padding: '10px', borderRadius: '6px' }}>
                {filteredIcons.map((tech) => (
                    <button
                        key={tech.slug}
                        type="button"
                        onClick={() => onSelectIcon(tech.slug)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '8px',
                            border: selectedSlug === tech.slug ? '2px solid #2563eb' : '1px solid #e2e8f0',
                            borderRadius: '6px',
                            background: selectedSlug === tech.slug ? '#eff6ff' : '#fff',
                            cursor: 'pointer'
                        }}
                    >
                        <img 
                            src={`https://cdn.simpleicons.org/${tech.slug}`} 
                            alt={tech.name} 
                            style={{ width: '24px', height: '24px' }}
                        />
                        <span style={{ fontSize: '0.75rem', textAlign: 'center' }}>{tech.name}</span>
                    </button>
                ))}

                {/* Custom Fallback if typing an exact slug not in predefined list */}
                {filteredIcons.length === 0 && searchTerm && (
                    <button
                        type="button"
                        onClick={() => onSelectIcon(customSlug)}
                        style={{
                            gridColumn: '1 / -1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '10px',
                            border: '1px dashed #2563eb',
                            background: '#f8fafc',
                            cursor: 'pointer'
                        }}
                    >
                        <img 
                            src={`https://cdn.simpleicons.org/${customSlug}`} 
                            alt="Custom" 
                            style={{ width: '24px', height: '24px' }}
                        />
                        <span>Use Custom Icon: "<strong>{customSlug}</strong>"</span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default IconPicker;