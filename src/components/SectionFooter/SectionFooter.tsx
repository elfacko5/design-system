import type { HTMLAttributes, ReactNode } from 'react';
import './SectionFooter.css';

export type SectionFooterVariant = 'default' | 'danger';
export type SectionFooterAlign = 'left' | 'center' | 'right';

export interface SectionFooterProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SectionFooterVariant;
  align?: SectionFooterAlign;
  /** Shows a leading icon — defaults to false, matching Figma's `showLeadingIcon`. */
  showIcon?: boolean;
  /** Overrides the default warning-circle glyph shown when `showIcon` is true. */
  icon?: ReactNode;
  children: ReactNode;
}

function WarningCircleIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="10.75" r="0.75" fill="currentColor" />
    </svg>
  );
}

/**
 * SectionFooter — from Figma node 9646:46526 ("Section Footer"). Covers
 * both Variants (Default/Danger) and all 3 Text alignment options
 * (Left/Center/Right — handled with plain `text-align`, since it's a layout
 * property rather than a themeable token). The optional leading
 * WarningCircle icon was recreated as a simple inline SVG rather than
 * fetched as an image asset, since it's a small standard glyph rather than
 * bespoke illustration.
 */
export function SectionFooter({
  variant = 'default',
  align = 'left',
  showIcon = false,
  icon,
  children,
  className,
  ...rest
}: SectionFooterProps) {
  return (
    <div
      {...rest}
      className={[
        'ds-section-footer',
        `ds-section-footer--${variant}`,
        `ds-section-footer--align-${align}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showIcon && <span className="ds-section-footer__icon">{icon ?? <WarningCircleIcon />}</span>}
      <span className="ds-section-footer__text">{children}</span>
    </div>
  );
}
