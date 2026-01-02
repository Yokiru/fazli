import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ProjectCard.css';

interface ProjectCardProps {
    title: string;
    category: string;
    imageUrl: string;
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
                        className="project-card__image"
                        loading="lazy"
                    />
                </div>
                <div className="project-card__info">
                    <span className="project-card__title">{title}</span>
                    <span className="project-card__separator">•</span>
                    <span className="project-card__category">{category}</span>
                </div>
            </div>

            {/* Lightbox Modal - using Portal to render outside component tree */}
            {isOpen && createPortal(
                <div
                    className={`lightbox-overlay ${isClosing ? 'lightbox-closing' : ''}`}
                    onClick={handleClose}
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
                        <img
                            src={imageUrl}
                            alt={`${title} full view`}
                            className="lightbox-image"
                        />
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
