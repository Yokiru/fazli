import { ProjectCard } from '../../molecules/ProjectCard/ProjectCard';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import './Projects.css';

// CONFIG: Project data - Edit titles, categories, and images here
const projectsData = [
    {
        id: 1,
        title: 'E-sports Tournament',
        category: 'E-sports Design',
        imageUrl: '/project-1.jpg',
    },
    {
        id: 2,
        title: 'Store Branding',
        category: 'Branding',
        imageUrl: '/project-2.jpg',
    },
    {
        id: 3,
        title: 'Event Poster',
        category: 'Poster Design',
        imageUrl: '/project-3.jpg',
    },
    {
        id: 4,
        title: 'Logo Collection',
        category: 'Logo Design',
        imageUrl: '/project-4.jpg',
    },
    {
        id: 5,
        title: 'Social Media',
        category: 'Feed Instagram',
        imageUrl: '/project-5.jpg',
    },
    {
        id: 6,
        title: 'Jersey Design',
        category: 'Apparel',
        imageUrl: '/project-6.jpg',
    },
];

/**
 * Projects Section Organism
 * Displays a 2-column grid of project cards
 */
export function Projects() {
    useScrollReveal();

    return (
        <section id="projects" className="projects container">
            <div className="projects__header reveal-text">
                <h2 className="projects__title">Karya Terbaru</h2>
                <p className="projects__subtitle">
                    Koleksi desain kreatif untuk berbagai kebutuhan bisnis dan komunitas.
                </p>
            </div>

            <div className="projects__grid reveal-group">
                {projectsData.map((project) => (
                    <ProjectCard
                        key={project.id}
                        title={project.title}
                        category={project.category}
                        imageUrl={project.imageUrl}
                    />
                ))}
            </div>
        </section>
    );
}
