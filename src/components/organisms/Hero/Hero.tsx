import { Button } from '../../atoms/Button/Button';
import { SocialIcon } from '../../atoms/SocialIcon/SocialIcon';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import './Hero.css';

/**
 * Hero Section Organism
 * Contains: Profile, Headline, Bio, CTA
 * Ref: MASTER_DESIGN_SYSTEM.md -> Hero Section
 */
export function Hero() {
    useScrollReveal();

    return (
        <section id="about" className="hero container">
            <div className="hero__content">
                {/* Profile Row */}
                <div className="hero__profile reveal-text">
                    <div className="hero__avatar">
                        {/* CONFIG: Replace with actual avatar image */}
                        <span aria-hidden="true">👤</span>
                    </div>
                    <div className="hero__profile-info">
                        <div className="hero__name-row">
                            <span className="hero__name">Fazli</span>
                            <div className="hero__status">
                                <span className="hero__status-dot" aria-hidden="true"></span>
                                Open for Project
                            </div>
                        </div>
                        <div className="hero__socials">
                            <SocialIcon platform="tiktok" href="https://www.tiktok.com/@fazli.design" />
                            <SocialIcon platform="instagram" href="https://www.instagram.com/fazli.design" />
                            <SocialIcon platform="facebook" href="https://www.facebook.com/mfazli.aliikbar" />
                        </div>
                    </div>
                </div>

                {/* Headline */}
                <h1 className="hero__headline reveal-text reveal-delay-200">
                    Desain Kreatif yang Bermakna, Fungsional, dan Menginspirasi.
                </h1>

                {/* Subtext/Bio */}
                <p className="hero__subtext reveal-text reveal-delay-300">
                    Fazli Design menghadirkan karya yang tidak hanya menarik secara visual,
                    tetapi juga fungsional, bermakna, penuh inovasi, dan mampu memberikan
                    pengalaman yang menginspirasi.
                </p>

                {/* Actions */}
                <div className="hero__actions reveal-text reveal-delay-400">
                    <Button href="#contact">Mulai Project</Button>
                </div>
            </div>
        </section>
    );
}
