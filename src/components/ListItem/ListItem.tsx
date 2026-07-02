import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import './ListItem.css';

function DefaultLeadingIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1.5" y="1.5" width="17" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 18L18 2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M5 2.5L9.5 7L5 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SelectionCheck() {
  return (
    <span className="ds-list-item__selection" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.5 8.5L6.5 11.5L12.5 4.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export interface ListItemProps {
  /** Primary text. */
  label: ReactNode;
  /** Secondary text shown below the label (not part of the inspected Figma states, styled to be consistent with it). */
  sublabel?: ReactNode;
  /** Content rendered in the leading icon slot. Defaults to a placeholder glyph, matching Figma. */
  leading?: ReactNode;
  /** Trailing text shown before the chevron. Ignored when `selected` is set. */
  detail?: ReactNode;
  /** Shows a selection checkmark instead of the detail/chevron accessory. */
  selected?: boolean;
  /** Boxed/bordered card style vs. a flat row with a bottom divider. From Figma's "Has Container" property. */
  container?: boolean;
  /** Renders a bottom divider on flat rows. Ignored when `container` is true, or on the last row. @default true */
  divider?: boolean;
  disabled?: boolean;
  /** If provided, the row renders as a real <button> instead of static content. */
  onClick?: () => void;
  className?: string;
}

/**
 * ListItem — a single row in a list, e.g. a settings row. Rebuilt from
 * Figma node 40002016:4493 ("List item", Version 2) rather than the token
 * system alone: that frame is the source of truth for the leading icon,
 * the lack of a hover state, the selection checkmark that replaces the
 * chevron, the container/flat border treatment, and the focus ring color
 * (intentionally blue, not the shared --color-border-focus indigo).
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      label,
      sublabel,
      leading,
      detail,
      selected = false,
      container = false,
      divider = true,
      disabled = false,
      onClick,
      className,
    },
    ref,
  ) => {
    const content = (
      <>
        <span className="ds-list-item__leading">{leading ?? <DefaultLeadingIcon />}</span>
        <span className="ds-list-item__text">
          <span className="ds-list-item__label">{label}</span>
          {sublabel && <span className="ds-list-item__sublabel">{sublabel}</span>}
        </span>
        {selected ? (
          <SelectionCheck />
        ) : (
          <span className="ds-list-item__trailing">
            {detail !== undefined && <span className="ds-list-item__detail">{detail}</span>}
            <Chevron />
          </span>
        )}
      </>
    );

    const rowClassNames = [
      'ds-list-item__row',
      container && 'ds-list-item__row--container',
      selected && 'ds-list-item__row--selected',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <li
        ref={ref}
        className={[
          'ds-list-item',
          !container && divider && 'ds-list-item--divider',
          container && 'ds-list-item--container',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {onClick && !disabled ? (
          <button type="button" className={rowClassNames} onClick={onClick}>
            {content}
          </button>
        ) : (
          <div className={rowClassNames} aria-disabled={disabled || undefined}>
            {content}
          </div>
        )}
      </li>
    );
  },
);

ListItem.displayName = 'ListItem';
