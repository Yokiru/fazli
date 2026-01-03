import { useEffect, useState, useRef } from 'react';
import { ProjectCard } from '../../molecules/ProjectCard/ProjectCard';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { supabase } from '../../../lib/supabase';
import type { Project } from '../../../types/database.types';
import './Projects.css';

/**
 * Projects Section Organism
 * Displays a horizontal slider of project cards fetched from Supabase
 * With global like and share buttons for the entire section
 */
export function Projects() {
    useScrollReveal();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Global likes state for the entire projects section
    const [totalLikes, setTotalLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        fetchProjects();
        // Check if user already liked
        const liked = localStorage.getItem('projects_section_liked') === 'true';
        setHasLiked(liked);
        // Get stored total likes
        const storedLikes = parseInt(localStorage.getItem('projects_section_likes') || '0', 10);
        setTotalLikes(storedLikes);
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
                // Calculate total likes from all projects
                const total = (data || []).reduce((sum, p) => sum + (p.like_count || 0), 0);
                setTotalLikes(total);
                localStorage.setItem('projects_section_likes', String(total));
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

    // Handle like for entire section
    const handleLike = () => {
        if (hasLiked) return;
        const newTotal = totalLikes + 1;
        setTotalLikes(newTotal);
        setHasLiked(true);
        localStorage.setItem('projects_section_liked', 'true');
        localStorage.setItem('projects_section_likes', String(newTotal));
    };

    // Handle share
    const handleShare = async () => {
        const shareData = {
            title: 'Fazli Design - Karya Terbaru',
            text: 'Lihat koleksi desain kreatif dari Fazli Design!',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link berhasil disalin!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
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

            {/* Global Like & Share for Projects Section - Bottom Left */}
            <div className="projects__actions">
                <button
                    className={`projects__action-btn ${hasLiked ? 'liked' : ''}`}
                    onClick={handleLike}
                    disabled={hasLiked}
                    aria-label="Like"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={hasLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span>{totalLikes}</span>
                </button>
                <button
                    className="projects__action-btn"
                    onClick={handleShare}
                    aria-label="Share"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <span>Share</span>
                </button>
            </div>
        </section>
    );
}
