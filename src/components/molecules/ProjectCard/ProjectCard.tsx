import { useInView } from '../../../hooks/useInView';
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
 * Ref: MASTER_DESIGN_SYSTEM.md -> Section: PROJECT_CARD
 */
export function ProjectCard({ title, category, imageUrl, href = '#' }: ProjectCardProps) {
    const [ref, isVisible] = useInView(0.1);

    return (
        <a
            href={href}
            className={`project-card fade-in ${isVisible ? 'visible' : ''}`}
            ref={ref as React.RefObject<HTMLAnchorElement>}
        >
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
        </a>
    );
}
