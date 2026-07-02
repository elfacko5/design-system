import type { ReactNode } from 'react';
import { Button } from '../Button';
import './Card.css';

export interface CardProps {
  /** Optional top media, e.g. an <img>. Rendered at a fixed height, object-contain. */
  media?: ReactNode;
  /** Small eyebrow label above the headline. */
  label?: ReactNode;
  headline: ReactNode;
  description?: ReactNode;
  /** Primary call to action. */
  primaryAction?: { label: string; onClick?: () => void };
  /** Optional secondary call to action, rendered next to the primary one. */
  secondaryAction?: { label: string; onClick?: () => void };
  className?: string;
}

/**
 * Card — from Figma node 40002020:9944, a large section with 20+ variants
 * (media on/off, button count/alignment, orientation). This implementation
 * covers the two representative configurations pulled from Figma: no-media
 * with a horizontal button group, and top-media. Other layout permutations
 * in that section (vertical stacked buttons, centered alignment) were not
 * individually built out.
 *
 * Note: the secondary button style in Figma's Card (gray border, dark text)
 * differs slightly from this design system's existing Button `secondary`
 * variant (indigo border/text). Card reuses the existing Button component
 * as-is rather than forking a new variant for this one context.
 */
export function Card({
  media,
  label,
  headline,
  description,
  primaryAction,
  secondaryAction,
  className,
}: CardProps) {
  return (
    <div className={['ds-card', className].filter(Boolean).join(' ')}>
      {media && <div className="ds-card__media">{media}</div>}
      <div className="ds-card__body">
        <div className="ds-card__content">
          {label && <div className="ds-card__label">{label}</div>}
          <div className="ds-card__headline">{headline}</div>
          {description && <div className="ds-card__description">{description}</div>}
        </div>
        {(primaryAction || secondaryAction) && (
          <div className="ds-card__buttons">
            {primaryAction && (
              <Button variant="primary" onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button variant="secondary" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
