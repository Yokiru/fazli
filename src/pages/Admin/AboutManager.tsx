import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Tool, Experience } from '../../types/database.types';
import { Button } from '../../components/atoms/Button/Button';
import './Admin.css';

export function AboutManager() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [experience, setExperience] = useState<Experience[]>([]);

    // Form States
    const [modalType, setModalType] = useState<'TOOL' | 'EXPERIENCE' | null>(null);
    const [uploading, setUploading] = useState(false);

    // Tool Form Data
    const [toolName, setToolName] = useState('');
    const [toolCategory, setToolCategory] = useState('');
    const [toolImage, setToolImage] = useState<File | null>(null);

    // Experience Form Data
    const [expCompany, setExpCompany] = useState('');
    const [expRole, setExpRole] = useState('');
    const [expPeriod, setExpPeriod] = useState('');
    const [expDesc, setExpDesc] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const { data: t } = await supabase.from('tools').select('*').order('id', { ascending: true });
        const { data: e } = await supabase.from('experience').select('*').order('id', { ascending: true });
        if (t) setTools(t);
        if (e) setExperience(e);
    };

    const handleUpload = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const filePath = `tools/${Date.now()}.${fileExt}`;
        const { error } = await supabase.storage.from('portfolio-images').upload(filePath, file);
        if (error) throw error;
        const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleToolSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        try {
            let imgUrl = '';
            if (toolImage) imgUrl = await handleUpload(toolImage);
            else return alert('Image required');

            const { error } = await supabase.from('tools').insert([{ name: toolName, category: toolCategory, image_url: imgUrl }]);
            if (error) throw error;

            setModalType(null);
            fetchData();
            // Reset
            setToolName(''); setToolCategory(''); setToolImage(null);
        } catch (err: any) {
            alert('Error: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleExpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        try {
            const { error } = await supabase.from('experience').insert([{
                company: expCompany, role: expRole, period: expPeriod, description: expDesc
            }]);
            if (error) throw error;

            setModalType(null);
            fetchData();
            // Reset
            setExpCompany(''); setExpRole(''); setExpPeriod(''); setExpDesc('');
        } catch (err: any) {
            alert('Error: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (table: 'tools' | 'experience', id: number) => {
        if (!confirm('Delete item?')) return;
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) alert('Error delete');
        else fetchData();
    };

    return (
        <div className="manager-page animate-in">
            <header className="manager-header">
                <div>
                    <h1>Manage About Page</h1>
                    <p>Update your stack and work experience.</p>
                </div>
            </header>

            {/* Experience Section */}
            <section className="admin-section">
                <div className="section-header">
                    <h2>Experience</h2>
                    <Button size="small" onClick={() => setModalType('EXPERIENCE')}>+ Add Job</Button>
                </div>
                <div className="items-list">
                    {experience.map(exp => (
                        <div key={exp.id} className="service-admin-card">
                            <div className="service-admin-info">
                                <h3>{exp.role} @ {exp.company}</h3>
                                <p className="service-price">{exp.period}</p>
                            </div>
                            <button className="icon-btn delete" onClick={() => handleDelete('experience', exp.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </section>

            <hr className="admin-divider" />

            {/* Tools Section */}
            <section className="admin-section">
                <div className="section-header">
                    <h2>My Stack (Tools)</h2>
                    <Button size="small" onClick={() => setModalType('TOOL')}>+ Add Tool</Button>
                </div>
                <div className="items-grid">
                    {tools.map(tool => (
                        <div key={tool.id} className="item-card">
                            <img src={tool.image_url} alt={tool.name} className="item-image" style={{ height: '100px', padding: '20px', objectFit: 'contain' }} />
                            <div className="item-info">
                                <h3>{tool.name}</h3>
                                <div className="item-meta">{tool.category}</div>
                            </div>
                            <div className="item-actions">
                                <button className="icon-btn delete" onClick={() => handleDelete('tools', tool.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modals */}
            {modalType === 'EXPERIENCE' && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>New Experience</h2>
                        <form onSubmit={handleExpSubmit} className="admin-form">
                            <input placeholder="Company" value={expCompany} onChange={e => setExpCompany(e.target.value)} required className="form-input" />
                            <input placeholder="Role" value={expRole} onChange={e => setExpRole(e.target.value)} required className="form-input" />
                            <input placeholder="Period (e.g. 2021 - Present)" value={expPeriod} onChange={e => setExpPeriod(e.target.value)} required className="form-input" />
                            <textarea placeholder="Description" value={expDesc} onChange={e => setExpDesc(e.target.value)} required className="form-input" rows={3} />
                            <div className="modal-actions">
                                <Button type="button" variant="ghost" onClick={() => setModalType(null)}>Cancel</Button>
                                <Button disabled={uploading}>Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {modalType === 'TOOL' && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>New Tool</h2>
                        <form onSubmit={handleToolSubmit} className="admin-form">
                            <input placeholder="Software Name" value={toolName} onChange={e => setToolName(e.target.value)} required className="form-input" />
                            <input placeholder="Category" value={toolCategory} onChange={e => setToolCategory(e.target.value)} required className="form-input" />
                            <div className="form-group">
                                <label>Tool Icon</label>
                                <input type="file" accept="image/*" onChange={e => setToolImage(e.target.files?.[0] || null)} required className="form-input" />
                            </div>
                            <div className="modal-actions">
                                <Button type="button" variant="ghost" onClick={() => setModalType(null)}>Cancel</Button>
                                <Button disabled={uploading}>Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
