import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../../../lib/supabase';
import './ProjectCard.css';

interface ProjectCardProps {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
    likeCount: number;
}

/**
 * Project Card Molecule
 * Displays a project with image, title, and category
 * Click to open full image in lightbox modal
 * Includes like and share functionality
 */
export function ProjectCard({ id, title, category, imageUrl, likeCount }: ProjectCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [likes, setLikes] = useState(likeCount || 0);
    const [hasLiked, setHasLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false);

    // Check if user already liked this project
    useEffect(() => {
        const likedProjects = JSON.parse(localStorage.getItem('liked_projects') || '[]');
        setHasLiked(likedProjects.includes(id));
    }, [id]);

    const handleClick = () => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
            document.body.style.overflow = '';
        }, 250);
    };

    // Handle like
    const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasLiked || isLiking) return;

        setIsLiking(true);
        const newLikes = likes + 1;
        setLikes(newLikes);
        setHasLiked(true);

        // Save to localStorage
        const likedProjects = JSON.parse(localStorage.getItem('liked_projects') || '[]');
        likedProjects.push(id);
        localStorage.setItem('liked_projects', JSON.stringify(likedProjects));

        // Update in Supabase
        try {
            await supabase
                .from('projects')
                .update({ like_count: newLikes })
                .eq('id', id);
        } catch (error) {
            console.error('Error updating like:', error);
        }

        setIsLiking(false);
    };

    // Handle share
    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const shareData = {
            title: title,
            text: `Check out this design: ${title}`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: copy link
                await navigator.clipboard.writeText(window.location.href);
                alert('Link berhasil disalin!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    // Prevent right-click on images
    const preventContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        return false;
    };

    // Prevent drag on images
    const preventDrag = (e: React.DragEvent) => {
        e.preventDefault();
        return false;
    };

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) handleClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    return (
        <>
            <div className="project-card" onClick={handleClick}>
                <div className="project-card__image-wrapper">
                    <img
                        src={imageUrl}
                        alt={`${title} project preview`}
                        className="project-card__image protected-image"
                        loading="lazy"
                        onContextMenu={preventContextMenu}
                        onDragStart={preventDrag}
                    />
                    <div className="project-card__overlay" />

                    {/* Like Badge */}
                    <div className={`project-card__like-badge ${hasLiked ? 'liked' : ''}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill={hasLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span>{likes}</span>
                    </div>
                </div>
                <div className="project-card__info">
                    <span className="project-card__title">{title}</span>
                    <span className="project-card__separator">•</span>
                    <span className="project-card__category">{category}</span>
                </div>
            </div>

            {/* Lightbox Modal */}
            {isOpen && createPortal(
                <div
                    className={`lightbox-overlay ${isClosing ? 'lightbox-closing' : ''}`}
                    onClick={handleClose}
                    onContextMenu={preventContextMenu}
                >
                    <button
                        className="lightbox-close"
                        onClick={handleClose}
                        aria-label="Close lightbox"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                    <div
                        className={`lightbox-content ${isClosing ? 'lightbox-content-closing' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="lightbox-image-wrapper">
                            <img
                                src={imageUrl}
                                alt={`${title} full view`}
                                className="lightbox-image protected-image"
                                onContextMenu={preventContextMenu}
                                onDragStart={preventDrag}
                            />
                            <div className="lightbox-image-overlay" />
                        </div>

                        {/* Caption with Like & Share */}
                        <div className="lightbox-caption">
                            <div className="lightbox-caption-text">
                                <span className="lightbox-title">{title}</span>
                                <span className="lightbox-category">{category}</span>
                            </div>
                            <div className="lightbox-actions">
                                <button
                                    className={`lightbox-action-btn ${hasLiked ? 'liked' : ''}`}
                                    onClick={handleLike}
                                    disabled={hasLiked}
                                    aria-label="Like"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill={hasLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                    <span>{likes}</span>
                                </button>
                                <button
                                    className="lightbox-action-btn"
                                    onClick={handleShare}
                                    aria-label="Share"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="18" cy="5" r="3" />
                                        <circle cx="6" cy="12" r="3" />
                                        <circle cx="18" cy="19" r="3" />
                                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                    </svg>
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
