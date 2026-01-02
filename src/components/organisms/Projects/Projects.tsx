import { useEffect, useState, useRef } from 'react';
import { ProjectCard } from '../../molecules/ProjectCard/ProjectCard';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { supabase } from '../../../lib/supabase';
import type { Project } from '../../../types/database.types';
import './Projects.css';

/**
 * Projects Section Organism
 * Displays a horizontal slider of project cards fetched from Supabase
 */
export function Projects() {
    useScrollReveal();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const sliderRef = useRef<HTMLDivElement>(null);

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

    const scroll = (direction: 'left' | 'right') => {
        if (!sliderRef.current) return;
        const scrollAmount = sliderRef.current.offsetWidth * 0.8;
        sliderRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <section id="projects" className="projects container">
            <div className="projects__header reveal-text">
                <h2 className="projects__title">Karya Terbaru</h2>
                <p className="projects__subtitle">
                    Koleksi desain kreatif untuk berbagai kebutuhan bisnis dan komunitas.
                </p>
            </div>

            <div className="projects__slider-wrapper">
                {/* Navigation Arrows */}
                <button
                    className="projects__nav projects__nav--left"
                    onClick={() => scroll('left')}
                    aria-label="Previous projects"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <div className="projects__slider" ref={sliderRef}>
                    {loading ? (
                        <p className="projects__loading">Loading projects...</p>
                    ) : (
                        projects.map((project) => (
                            <div className="projects__slide" key={project.id}>
                                <ProjectCard
                                    id={project.id}
                                    title={project.title}
                                    category={project.category}
                                    imageUrl={project.image_url}
                                    likeCount={project.like_count || 0}
                                />
                            </div>
                        ))
                    )}
                </div>

                <button
                    className="projects__nav projects__nav--right"
                    onClick={() => scroll('right')}
                    aria-label="Next projects"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
