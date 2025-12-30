import { useEffect } from 'react';

/**
 * Custom hook to trigger animations when elements enter the viewport.
 * Adds 'is-visible' class to elements with 'reveal-text', 'reveal-image', or 'reveal-group' classes.
 * 
 * Usage:
 * Call useScrollReveal() in the component where you want animations to run.
 * Add 'reveal-text', 'reveal-image', etc., to your HTML elements.
 */
export function useScrollReveal() {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15, // Trigger when 15% of the element is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.reveal-text, .reveal-image, .reveal-group');
        animatedElements.forEach((el) => observer.observe(el));

        return () => {
            animatedElements.forEach((el) => observer.unobserve(el));
        };
    }, []); // Run once on mount
}
