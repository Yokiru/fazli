import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ProjectCard.css';

interface ProjectCardProps {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
    likeCount?: number;
}

/**
 * Project Card Molecule
 * Displays a project with image, title, and category
 * Click to open full image in lightbox modal
 */
export function ProjectCard({ title, category, imageUrl }: ProjectCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

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
                        <div className="lightbox-caption">
                            <span className="lightbox-title">{title}</span>
                            <span className="lightbox-category">{category}</span>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
