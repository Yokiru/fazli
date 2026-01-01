import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'ghost';
type ButtonSize = 'default' | 'small';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    // We can also support anchor props if needed, but for now let's keep it simple
    // By extending ButtonHTMLAttributes, we get onClick, disabled, type, etc.
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
    className = '',
    ...props
}: ButtonProps) {
    const baseClass = `button button--${variant} ${size === 'small' ? 'button--small' : ''} ${className}`.trim();

    // If href is provided, render as anchor
    if (href) {
        return (
            <a href={href} className={baseClass} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
                {children}
            </a>
        );
    }

    return (
        <button className={baseClass} {...props}>
            {children}
        </button>
    );
}
