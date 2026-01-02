import { useState } from 'react';
import './ProjectCard.css';

interface ProjectCardProps {
    title: string;
    category: string;
    imageUrl: string;
    href?: string;
}

/**
 * Project Card Molecule
 * Displays a project with image, title, and category
 * Click to open full image in lightbox modal
 */
export function ProjectCard({ title, category, imageUrl }: ProjectCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent scroll when modal open
    };

    const handleClose = () => {
        setIsOpen(false);
        document.body.style.overflow = '';
    };

    return (
        <>
            <div className="project-card reveal-image" onClick={handleClick}>
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

            {/* Lightbox Modal */}
            {isOpen && (
                <div className="lightbox-overlay" onClick={handleClose}>
                    <button className="lightbox-close" onClick={handleClose} aria-label="Close">
                        ✕
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
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
                </div>
            )}
        </>
    );
}
