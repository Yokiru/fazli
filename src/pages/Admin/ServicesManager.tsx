import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Service } from '../../types/database.types';
import { Button } from '../../components/atoms/Button/Button';
import './Admin.css';

export function ServicesManager() {
    const [services, setServices] = useState<Service[]>([]);
    const [uploading, setUploading] = useState(false);

    // Form States
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [features, setFeatures] = useState(''); // Comma separated

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const { data } = await supabase.from('services').select('*').order('id', { ascending: true });
        setServices(data || []);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            // Convert comma separated string to array
            const featuresArray = features.split(',').map(f => f.trim()).filter(f => f !== '');

            const { error } = await supabase.from('services').insert([
                { name, description, price, duration, features: featuresArray }
            ]);

            if (error) throw error;

            // Reset form
            setName('');
            setDescription('');
            setPrice('');
            setDuration('');
            setFeatures('');
            setIsFormOpen(false);
            fetchServices();

        } catch (error: any) {
            alert('Error adding service: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this service?')) return;
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) alert('Error deleting service');
        else fetchServices();
    };

    return (
        <div className="manager-page animate-in">
            <header className="manager-header">
                <div>
                    <h1>Manage Services</h1>
                    <p>Edit your service offerings and pricing.</p>
                </div>
                <Button onClick={() => setIsFormOpen(true)}>+ Add Service</Button>
            </header>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>New Service</h2>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Service Name</label>
                                <input value={name} onChange={e => setName(e.target.value)} required className="form-input" />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    required
                                    className="form-input"
                                    rows={3}
                                />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. Start from IDR 1jt" required className="form-input" />
                            </div>
                            <div className="form-group">
                                <label>Duration</label>
                                <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 3-5 Days" required className="form-input" />
                            </div>
                            <div className="form-group">
                                <label>Features (comma separated)</label>
                                <textarea
                                    value={features}
                                    onChange={e => setFeatures(e.target.value)}
                                    placeholder="Feature 1, Feature 2, Feature 3"
                                    required
                                    className="form-input"
                                    rows={3}
                                />
                            </div>
                            <div className="modal-actions">
                                <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                                <Button disabled={uploading}>Save Service</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Services List */}
            <div className="items-list">
                {services.map(service => (
                    <div key={service.id} className="service-admin-card">
                        <div className="service-admin-info">
                            <h3>{service.name}</h3>
                            <p className="service-price">{service.price}</p>
                        </div>
                        <div className="service-admin-actions">
                            <button className="icon-btn delete" onClick={() => handleDelete(service.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
