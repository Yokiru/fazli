import { useEffect, useState } from 'react';
import { ProjectCard } from '../../molecules/ProjectCard/ProjectCard';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { supabase } from '../../../lib/supabase';
import type { Project } from '../../../types/database.types';
import './Projects.css';

/**
 * Projects Section Organism
 * Displays a 2-column grid of project cards fetched from Supabase
 */
export function Projects() {
    useScrollReveal();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('id', { ascending: true });

            if (error) {
                console.error('Error fetching projects:', error);
            } else {
                setProjects(data || []);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="projects" className="projects container">
            <div className="projects__header reveal-text">
                <h2 className="projects__title">Karya Terbaru</h2>
                <p className="projects__subtitle">
                    Koleksi desain kreatif untuk berbagai kebutuhan bisnis dan komunitas.
                </p>
            </div>

            <div className="projects__grid reveal-group">
                {loading ? (
                    // Simple loading skeleton or placeholder
                    <p>Loading projects...</p>
                ) : (
                    projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            category={project.category}
                            imageUrl={project.image_url}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
