import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';

export function Dashboard() {
    const [stats, setStats] = useState({
        projects: 0,
        services: 0,
        experience: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
            const { count: servicesCount } = await supabase.from('services').select('*', { count: 'exact', head: true });
            const { count: expCount } = await supabase.from('experience').select('*', { count: 'exact', head: true });

            setStats({
                projects: projectsCount || 0,
                services: servicesCount || 0,
                experience: expCount || 0
            });
        };

        fetchStats();
    }, []);

    return (
        <div className="dashboard-content animate-in">
            <header className="dashboard-header">
                <h1>Overview</h1>
                <p>Welcome back! Here's what's on your portfolio.</p>
            </header>

            <div className="dashboard-grid">
                <Link to="/admin/projects" className="stat-card">
                    <h3>Projects</h3>
                    <div className="stat-value">{stats.projects}</div>
                    <span className="stat-action">Manage Projects →</span>
                </Link>

                <Link to="/admin/services" className="stat-card">
                    <h3>Services</h3>
                    <div className="stat-value">{stats.services}</div>
                    <span className="stat-action">Manage Services →</span>
                </Link>

                <Link to="/admin/about" className="stat-card">
                    <h3>Experience</h3>
                    <div className="stat-value">{stats.experience}</div>
                    <span className="stat-action">Manage About →</span>
                </Link>
            </div>
        </div>
    );
}
