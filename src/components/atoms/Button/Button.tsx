import './Button.css';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'ghost';
    size?: 'default' | 'small';
    href?: string;
    onClick?: () => void;
    className?: string;
    ariaLabel?: string;
}

/**
 * Button Atom Component
 * Variants: primary (white), ghost (transparent)
 * Ref: MASTER_DESIGN_SYSTEM.md -> Section: BUTTON
 */
export function Button({
    children,
    variant = 'primary',
    size = 'default',
    href,
    onClick,
    className = '',
    ariaLabel,
}: ButtonProps) {
    const baseClass = `button button--${variant} ${size === 'small' ? 'button--small' : ''} ${className}`.trim();

    // If href is provided, render as anchor
    if (href) {
        return (
            <a href={href} className={baseClass} aria-label={ariaLabel}>
                {children}
            </a>
        );
    }

    return (
        <button className={baseClass} onClick={onClick} aria-label={ariaLabel}>
            {children}
        </button>
    );
}
