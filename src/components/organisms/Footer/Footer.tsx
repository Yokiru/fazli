import { Button } from '../../atoms/Button/Button';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import './Footer.css';

/**
 * Footer Organism
 * Contains: CTA headline, Contact info, Copyright
 */
export function Footer() {
    useScrollReveal();

    return (
        <footer id="contact" className="footer container" role="contentinfo">
            <div className="footer__cta reveal-text">
                <h2 className="footer__headline">Mari Berkolaborasi!</h2>
                <Button href="https://wa.me/6282139233954" aria-label="Hubungi via WhatsApp">
                    Hubungi Saya
                </Button>

                <div className="footer__contact-info">
                    <a href="mailto:fazlidesign@gmail.com" className="footer__contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <path d="m22 6-10 7L2 6" />
                        </svg>
                        fazlidesign@gmail.com
                    </a>
                    <a href="https://wa.me/6282139233954" className="footer__contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        +62 821-3923-3954
                    </a>
                </div>
            </div>

            <div className="footer__bottom">
                <p className="footer__copyright">
                    © {new Date().getFullYear()} Fazli Design. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
