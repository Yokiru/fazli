import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Footer } from '../../components/organisms/Footer/Footer';
import './About.css';

// Tool/software icons data
const toolsData = [
    { name: 'PixelLab', category: 'Graphic Design', image: '/stack-pixellab.webp' },
    { name: 'Canva', category: 'Design Tool', image: '/stack-canva.jpg' },
    { name: 'Photoshop', category: 'Photo Editing', image: '/stack-photoshop.png' },
    { name: 'Ibis Paint', category: 'Digital Art', image: '/stack-ibispaint.jpg' },
    { name: 'Infinite Design', category: 'Vector Design', image: '/stack-infinitedesign.png' },
    { name: 'PicsArt', category: 'Photo & Video', image: '/stack-picsart.png' },
];

// Experience data
const experienceData = [
    {
        id: 1,
        company: 'Freelance Designer',
        role: 'Creative Designer',
        period: '2021 - Sekarang',
        description: 'Mengerjakan berbagai project desain grafis untuk klien dari berbagai industri, termasuk E-sports, UMKM, dan brand lokal.',
    },
    {
        id: 2,
        company: 'Universitas',
        role: 'S1 Ilmu Komunikasi',
        period: '2020 - Sekarang',
        description: 'Mendalami ilmu komunikasi visual dan strategi branding sebagai fondasi dalam berkarir di dunia desain.',
    },
];

/**
 * About Page Component
 * Following Nyx design pattern with Fazli content
 */
export function AboutPage() {
    useScrollReveal();

    return (
        <>
            <main className="about-page">
                {/* Hero Section */}
                <section className="about-hero container">
                    <div className="about-hero__content">
                        <div className="about-hero__text reveal-text">
                            <h1 className="about-hero__title">
                                <span className="text-primary">
                                    Hai, Saya Fazli, seorang creative designer dengan pengalaman
                                    dalam menciptakan desain grafis yang menarik dan bermakna.
                                </span>{' '}
                                <span className="text-secondary">
                                    Saya berfokus pada E-sports design, logo, branding, dan konten
                                    visual untuk membantu brand Anda tampil menonjol.
                                </span>
                            </h1>
                        </div>
                        <div className="about-hero__image reveal-image">
                            <img
                                src="/fazli-photo.jpg"
                                alt="Muhammad Fazli Ali Ikbar - Creative Designer"
                                className="about-hero__photo"
                            />
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <section className="about-experience container">
                    <div className="about-section-header reveal-text">
                        <h2 className="about-section-title">Pengalaman</h2>
                        <span className="about-section-count">{experienceData.length}</span>
                    </div>
                    <div className="about-experience__list reveal-group">
                        {experienceData.map((exp) => (
                            <ExperienceItem key={exp.id} experience={exp} />
                        ))}
                    </div>
                </section>

                {/* Tools/Stack Section */}
                <section className="about-tools container">
                    <div className="about-tools__header reveal-text">
                        <h2 className="about-section-title">My Stack</h2>
                        <div className="about-tools__line"></div>
                        <div className="about-tools__icons">
                            {toolsData.map((tool) => (
                                <img
                                    key={tool.name}
                                    src={tool.image}
                                    alt={tool.name}
                                    className="about-tools__icon-preview"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="about-tools__grid reveal-group">
                        {toolsData.map((tool) => (
                            <div key={tool.name} className="tool-card">
                                <img
                                    src={tool.image}
                                    alt={tool.name}
                                    className="tool-card__icon"
                                />
                                <div className="tool-card__content">
                                    <div className="tool-card__top-row">
                                        <span className="tool-card__name">{tool.name}</span>
                                        <div className="tool-card__line"></div>
                                        <span className="tool-card__arrow">↗</span>
                                    </div>
                                    <span className="tool-card__category">{tool.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

// Experience Item Component
interface ExperienceItemProps {
    experience: {
        id: number;
        company: string;
        role: string;
        period: string;
        description: string;
    };
}

function ExperienceItem({ experience }: ExperienceItemProps) {
    return (
        <article className="experience-item">
            <div className="experience-item__header">
                <div className="experience-item__info">
                    <h3 className="experience-item__company">{experience.company}</h3>
                    <p className="experience-item__role">{experience.role}</p>
                </div>
                <span className="experience-item__period">{experience.period}</span>
            </div>
            <p className="experience-item__description">{experience.description}</p>
        </article>
    );
}


