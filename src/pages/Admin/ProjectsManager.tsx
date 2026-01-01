import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import type { Project } from '../../types/database.types';
import { Button } from '../../components/atoms/Button/Button';
import './Admin.css';

export function ProjectsManager() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const { data } = await supabase.from('projects').select('*').order('id', { ascending: false });
        setProjects(data || []);
        setLoading(false);
    };

    const handleImageUpload = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('portfolio-images')
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = '';
            if (imageFile) {
                imageUrl = await handleImageUpload(imageFile);
            } else {
                alert('Please select an image');
                setUploading(false);
                return;
            }

            const { error } = await supabase.from('projects').insert([
                { title, category, image_url: imageUrl }
            ]);

            if (error) throw error;

            // Reset form
            setTitle('');
            setCategory('');
            setImageFile(null);
            setIsFormOpen(false);
            fetchProjects();

        } catch (error: any) {
            alert('Error adding project: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) {
            alert('Error deleting project');
        } else {
            fetchProjects();
        }
    };

    return (
        <div className="manager-page animate-in">
            <header className="manager-header">
                <div>
                    <h1>Manage Projects</h1>
                    <p>Add, edit, or remove portfolio projects.</p>
                </div>
                <Button onClick={() => setIsFormOpen(true)}>+ Add Project</Button>
            </header>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>New Project</h2>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Project Title</label>
                                <input
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="e.g. E-sports Tournament"
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    placeholder="e.g. Branding"
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Project Cover Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setImageFile(e.target.files?.[0] || null)}
                                    className="form-input"
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                                <Button disabled={uploading}>{uploading ? 'Saving...' : 'Save Project'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Projects List */}
            <div className="items-grid">
                {projects.map(project => (
                    <div key={project.id} className="item-card">
                        <img src={project.image_url} alt={project.title} className="item-image" />
                        <div className="item-info">
                            <h3>{project.title}</h3>
                            <span className="item-meta">{project.category}</span>
                        </div>
                        <div className="item-actions">
                            <button className="icon-btn delete" onClick={() => handleDelete(project.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
