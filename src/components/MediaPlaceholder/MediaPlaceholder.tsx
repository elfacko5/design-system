import type { HTMLAttributes, ReactNode } from 'react';
import './MediaPlaceholder.css';

export type MediaPlaceholderType =
  'image' | 'illustration' | 'icon' | 'video-label' | 'video-overlay';
export type MediaPlaceholderRatio = '1x1' | '16x9' | '4x3' | '3x4';

export interface MediaPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  /** From Figma's Type property. */
  type?: MediaPlaceholderType;
  /** From Figma's Ratio property. */
  ratio?: MediaPlaceholderRatio;
  /** Optional real image source — renders behind the type-specific chrome (overlay tint, video badge, etc). Omit to show the empty placeholder look. */
  src?: string;
  alt?: string;
  /** Custom glyph for `type="icon"`/`type="illustration"` — defaults to a generic placeholder icon. */
  icon?: ReactNode;
  /** Duration label shown on `video-label`/`video-overlay` types, e.g. "2:36". */
  duration?: string;
}

function DefaultIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M21 15l-5-5-9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M7 4.5v15l14-7.5-14-7.5z" />
    </svg>
  );
}

/**
 * MediaPlaceholder — from Figma node 5801:8441. Covers all 5 Types
 * (Image/Illustration/Icon/Video - Label/Video - Overlay) at all 4 Ratios
 * (1:1/16:9/4:3/3:4) documented in the "Media placeholder" frame.
 *
 * Two deliberate deviations from Figma's literal mockup:
 *  1. Sizing uses CSS `aspect-ratio` + `width: 100%` instead of Figma's
 *     fixed 343px-wide mobile frame, so the component is actually
 *     responsive rather than pinned to one screen width.
 *  2. Figma's Illustration/Icon fallback is a literal isometric-cube
 *     illustration built from dozens of individually rotated vector line
 *     segments (not a reusable icon asset) whose image is only reachable
 *     via a temporary 7-day Figma CDN URL. A simple generic placeholder
 *     glyph is rendered instead — pass a real `icon` to override it.
 */
export function MediaPlaceholder({
  type = 'image',
  ratio = '1x1',
  src,
  alt = '',
  icon,
  duration,
  className,
  ...rest
}: MediaPlaceholderProps) {
  const isVideoOverlay = type === 'video-overlay';
  const isVideoLabel = type === 'video-label';
  const isGlyphType = type === 'illustration' || type === 'icon';
  const playIconSize = ratio === '1x1' && isVideoOverlay ? 'large' : 'default';

  return (
    <div
      {...rest}
      className={[
        'ds-media-placeholder',
        `ds-media-placeholder--ratio-${ratio}`,
        `ds-media-placeholder--${type}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {src && <img className="ds-media-placeholder__image" src={src} alt={alt} />}

      {isGlyphType && !src && (
        <span className="ds-media-placeholder__icon">{icon ?? <DefaultIcon />}</span>
      )}

      {isVideoOverlay && (
        <>
          <div className="ds-media-placeholder__overlay" />
          <span
            className={`ds-media-placeholder__play ds-media-placeholder__play--${playIconSize}`}
          >
            <PlayIcon />
          </span>
          {duration && <span className="ds-media-placeholder__overlay-duration">{duration}</span>}
        </>
      )}

      {isVideoLabel && (
        <span className="ds-media-placeholder__label-badge">
          <PlayIcon />
          {duration && <span>{duration}</span>}
        </span>
      )}
    </div>
  );
}
