import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../atoms/Button/Button';
import './Header.css';

/**
 * Header Organism - Sticky navigation with glassmorphism
 * Ref: MASTER_DESIGN_SYSTEM.md -> Section: HEADER
 */
export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { label: 'About', href: '/about' },
        { label: 'Work', href: '/work' },
    ];

    return (
        <header className="header" role="banner">
            <div className="header__inner">
                {/* Logo */}
                <Link to="/" className="header__logo" aria-label="Go to homepage">
                    Fazli Design
                </Link>

                {/* Desktop Navigation */}
                <nav className="header__nav" role="navigation" aria-label="Main navigation">
                    {navLinks.map((link) => (
                        link.href.startsWith('/') && !link.href.includes('#') ? (
                            <Link
                                key={link.label}
                                to={link.href}
                                className={`header__link ${location.pathname === link.href ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <a key={link.label} href={link.href} className="header__link">
                                {link.label}
                            </a>
                        )
                    ))}
                    <Button href="#contact" size="small">
                        Hubungi Saya
                    </Button>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="header__menu-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {mobileMenuOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <nav className={`header__mobile-menu ${mobileMenuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
                {navLinks.map((link) => (
                    link.href.startsWith('/') && !link.href.includes('#') ? (
                        <Link
                            key={link.label}
                            to={link.href}
                            className="header__mobile-link"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ) : (
                        <a
                            key={link.label}
                            href={link.href}
                            className="header__mobile-link"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    )
                ))}

                <div className="header__mobile-cta">
                    <Button
                        href="#contact"
                        size="small"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mobile-cta-btn"
                    >
                        Contact me
                    </Button>
                </div>
            </nav>
        </header>
    );
}
