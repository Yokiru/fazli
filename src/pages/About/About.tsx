import { useEffect, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Footer } from '../../components/organisms/Footer/Footer';
import { supabase } from '../../lib/supabase';
import type { Tool, Experience } from '../../types/database.types';
import './About.css';

/**
 * About Page Component
 * Following Nyx design pattern with Fazli content
 */
export function AboutPage() {
    useScrollReveal();
    const [tools, setTools] = useState<Tool[]>([]);
    const [experience, setExperience] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Tools
                const { data: toolsData } = await supabase
                    .from('tools')
                    .select('*')
                    .order('id', { ascending: true });

                if (toolsData) setTools(toolsData);

                // Fetch Experience
                const { data: expData } = await supabase
                    .from('experience')
                    .select('*')
                    .order('id', { ascending: true });

                if (expData) setExperience(expData);

            } catch (error) {
                console.error('Error fetching about data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                        <span className="about-section-count">{experience.length}</span>
                    </div>
                    <div className="about-experience__list reveal-group">
                        {loading ? (
                            <p>Loading experience...</p>
                        ) : (
                            experience.map((exp) => (
                                <ExperienceItem key={exp.id} experience={exp} />
                            ))
                        )}
                    </div>
                </section>

                {/* Tools/Stack Section */}
                <section className="about-tools container">
                    <div className="about-tools__header reveal-text">
                        <h2 className="about-section-title">My Stack</h2>
                        <div className="about-tools__line"></div>
                        <div className="about-tools__icons">
                            {tools.map((tool) => (
                                <img
                                    key={tool.id}
                                    src={tool.image_url}
                                    alt={tool.name}
                                    className="about-tools__icon-preview"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="about-tools__grid reveal-group">
                        {loading ? (
                            <p>Loading tools...</p>
                        ) : (
                            tools.map((tool) => (
                                <div key={tool.id} className="tool-card">
                                    <img
                                        src={tool.image_url}
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
                            ))
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

// Experience Item Component
interface ExperienceItemProps {
    experience: Experience;
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


