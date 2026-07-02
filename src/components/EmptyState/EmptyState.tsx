import type { ReactNode } from 'react';
import { Button } from '../Button';
import './EmptyState.css';

function PlaceholderIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect
        x="4"
        y="4"
        width="32"
        height="32"
        rx="8"
        stroke="#9ca3af"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <path d="M14 26L26 14M14 14l12 12" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export interface EmptyStateProps {
  /** `page` = no card chrome (Figma's "On page" config), `card` = white bg + border (Figma's "Card" config). */
  variant?: 'page' | 'card';
  icon?: ReactNode;
  headline?: ReactNode;
  description?: ReactNode;
  action?: { label: string; onClick?: () => void };
  className?: string;
}

/**
 * EmptyState — from Figma node 5757:1488. Covers both configs ("On page"
 * and "Card") pulled directly from Figma.
 */
export function EmptyState({
  variant = 'page',
  icon,
  headline,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={['ds-empty-state', `ds-empty-state--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="ds-empty-state__icon">{icon ?? <PlaceholderIcon />}</div>
      <div className="ds-empty-state__copy">
        {headline && <p className="ds-empty-state__headline">{headline}</p>}
        {description && <p className="ds-empty-state__description">{description}</p>}
      </div>
      {action && (
        <Button variant="secondary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
