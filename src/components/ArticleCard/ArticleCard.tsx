import type { ReactNode } from 'react';
import './ArticleCard.css';

function CheckmarkOverlay() {
  return (
    <div className="ds-article-card__read-overlay" aria-label="Read">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M5 12.5L10 17.5L19 7.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export interface ArticleCardProps {
  /** Where the image sits relative to the text content. */
  imagePosition?: 'top' | 'right';
  imageSrc?: string;
  imageAlt?: string;
  headline: ReactNode;
  /** e.g. "Jul 2, 2026 · 4 min read" — rendered as a single meta line. */
  meta?: ReactNode;
  description?: ReactNode;
  tags?: string[];
  /** Overlays a checkmark on the image to indicate the article has been read. */
  read?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * ArticleCard — from Figma node 6460:1610. Covers both layout variants
 * (image="top" and image="right") pulled directly from Figma, including the
 * optional "read" checkmark overlay on the image.
 */
export function ArticleCard({
  imagePosition = 'top',
  imageSrc,
  imageAlt = '',
  headline,
  meta,
  description,
  tags,
  read = false,
  onClick,
  className,
}: ArticleCardProps) {
  const image = imageSrc && (
    <div className={`ds-article-card__image ds-article-card__image--${imagePosition}`}>
      <img src={imageSrc} alt={imageAlt} />
      {read && <CheckmarkOverlay />}
    </div>
  );

  const content = (
    <div className="ds-article-card__content">
      <div className="ds-article-card__text">
        {meta && <div className="ds-article-card__meta">{meta}</div>}
        <div className="ds-article-card__headline">{headline}</div>
        {description && <div className="ds-article-card__description">{description}</div>}
      </div>
      {tags && tags.length > 0 && (
        <div className="ds-article-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="ds-article-card__tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={[
        'ds-article-card',
        `ds-article-card--${imagePosition}`,
        onClick && 'ds-article-card--interactive',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {imagePosition === 'top' ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </Wrapper>
  );
}
