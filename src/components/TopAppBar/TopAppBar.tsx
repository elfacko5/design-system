import type { ReactNode } from 'react';
import { IconButton } from '../IconButton';
import './TopAppBar.css';

function CaretLeftIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 3L5 8l5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface TopAppBarAction {
  icon: ReactNode;
  'aria-label': string;
  onClick?: () => void;
  badgeCount?: number;
}

export interface TopAppBarProps {
  /** `collapsed` shows the title inline in the bar; `expanded` shows it as a large heading below the controls row (Figma's iOS large-title pattern). */
  variant?: 'collapsed' | 'expanded';
  title?: ReactNode;
  /** Back-button label, e.g. the previous screen's title (iOS convention). Omit to hide the back button. */
  backLabel?: ReactNode;
  onBack?: () => void;
  actions?: TopAppBarAction[];
  showBottomBorder?: boolean;
  /**
   * 0–100. Renders a thin progress track under the title/controls row
   * (Figma's "Hierarchy Level 2 with progress bar" pattern). Omit to hide
   * it entirely — unlike `showBottomBorder`, this doesn't toggle on scroll,
   * it persists across both scroll states in the source design.
   */
  progress?: number;
  className?: string;
}

/**
 * TopAppBar — from Figma node 6525:26265 ("Top app bar - iOS"). Covers the
 * Collapsed and Expanded configs and the Title/Controls + trailing
 * icon-button (with optional badge) subcomponents. The literal iOS status
 * bar (clock, signal, wifi, battery glyphs) simulated in Figma is native
 * OS chrome, not a reusable web element, so it isn't rendered here —
 * consistent with skipping Dialog's "System iOS" variant and Radio's
 * Android variant elsewhere in this build. The "Modal" / "Modal Stack"
 * presentation variants (which only add native sheet-corner treatments)
 * were likewise left out as non-web-applicable.
 *
 * `progress` covers the "Hierarchy Level 2 with progress bar" pattern
 * (node 6742:459 / 6742:468, from the Navigation pattern page) — a thin
 * indeterminate-free progress track that sits under the title row and
 * persists across scroll, unlike `showBottomBorder`.
 */
export function TopAppBar({
  variant = 'collapsed',
  title,
  backLabel,
  onBack,
  actions = [],
  showBottomBorder = false,
  progress,
  className,
}: TopAppBarProps) {
  const clampedProgress = progress === undefined ? undefined : Math.min(100, Math.max(0, progress));
  return (
    <div
      className={['ds-top-app-bar', showBottomBorder && 'ds-top-app-bar--bordered', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="ds-top-app-bar__row">
        <div className="ds-top-app-bar__leading">
          {backLabel && (
            <button type="button" className="ds-top-app-bar__back" onClick={onBack}>
              <span className="ds-top-app-bar__back-icon">
                <CaretLeftIcon />
              </span>
              <span className="ds-top-app-bar__back-label">{backLabel}</span>
            </button>
          )}
        </div>
        {variant === 'collapsed' && title && <span className="ds-top-app-bar__title">{title}</span>}
        <div className="ds-top-app-bar__trailing">
          {actions.map((action, index) => (
            <IconButton
              key={index}
              hierarchy="secondary"
              size="small"
              icon={action.icon}
              aria-label={action['aria-label']}
              onClick={action.onClick}
              badgeCount={action.badgeCount}
            />
          ))}
        </div>
      </div>
      {clampedProgress !== undefined && (
        <div className="ds-top-app-bar__progress-row">
          <div
            className="ds-top-app-bar__progress-track"
            role="progressbar"
            aria-valuenow={clampedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="ds-top-app-bar__progress-fill"
              style={{ width: `${clampedProgress}%` }}
            />
          </div>
        </div>
      )}
      {variant === 'expanded' && title && (
        <div className="ds-top-app-bar__heading-row">
          <span className="ds-top-app-bar__heading">{title}</span>
        </div>
      )}
    </div>
  );
}
