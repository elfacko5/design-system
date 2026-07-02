import type { HTMLAttributes, ReactNode } from 'react';
import './SheetTopBar.css';

export type SheetTopBarAlign = 'left' | 'center';

export interface SheetTopBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  /** Title position — from Figma's "Title center"/"Title left" variants. */
  align?: SheetTopBarAlign;
  /** Called when the close (X) button is clicked. Omit to hide the button entirely — Figma's `titleAndControls` toggle. */
  onClose?: () => void;
  /** Accessible label for the close button. */
  closeLabel?: string;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M4.5 4.5l9 9M13.5 4.5l-9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * SheetTopBar — from Figma node 6315:1851 ("Sheet top bar"). The handle bar
 * + title row shown atop a bottom sheet / modal drawer. Covers both Figma
 * variants (Title center / Title left); the close button is shown whenever
 * `onClose` is provided, matching Figma's `titleAndControls` toggle.
 */
export function SheetTopBar({
  title,
  align = 'center',
  onClose,
  closeLabel = 'Close',
  className,
  ...rest
}: SheetTopBarProps) {
  return (
    <div {...rest} className={['ds-sheet-top-bar', className].filter(Boolean).join(' ')}>
      <div className="ds-sheet-top-bar__grabber-container">
        <div className="ds-sheet-top-bar__grabber" />
      </div>
      {(title !== undefined || onClose) && (
        <div className={['ds-sheet-top-bar__row', `ds-sheet-top-bar__row--${align}`].join(' ')}>
          {title !== undefined && <span className="ds-sheet-top-bar__title">{title}</span>}
          {onClose && (
            <button
              type="button"
              className="ds-sheet-top-bar__close"
              aria-label={closeLabel}
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
