import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Chip.css';

export type ChipType = 'input' | 'filter' | 'action';

function RemoveIcon() {
  return (
    <svg
      className="ds-chip__remove-icon"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** `input` = static token with a remove (x) action. `filter` = toggleable pill. `action` = triggers an action, may carry a leading icon. */
  type?: ChipType;
  /** Only meaningful for `type="filter"`. */
  selected?: boolean;
  /**
   * Leading icon. Used by `type="action"` (16px, per Figma's Action chip)
   * and optionally by `type="filter"` (20px, per Figma's Filter chip
   * "Leading icon" configuration — node 5173:2924). Ignored for `type="input"`.
   */
  icon?: ReactNode;
  /** Called when the remove (x) is activated — only rendered for `type="input"`. */
  onRemove?: () => void;
  children?: ReactNode;
}

/**
 * Chip — from Figma node 40002020:11041, a large section covering Input,
 * Filter, and Action chip types across default/selected/disabled states.
 * This implementation covers the common default/selected/disabled states
 * pulled directly from Figma for each type — including the Filter chip's
 * optional leading icon — but further micro-states in that section (avatar,
 * counter, caret, 1-character configurations) were not individually built.
 */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    { type = 'filter', selected = false, icon, onRemove, disabled, children, className, ...rest },
    ref,
  ) => {
    const classNames = [
      'ds-chip',
      `ds-chip--${type}`,
      type === 'filter' && icon && 'ds-chip--has-icon',
      selected && 'ds-chip--selected',
      disabled && 'ds-chip--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (type === 'input') {
      return (
        <span className={classNames}>
          <span className="ds-chip__label">{children}</span>
          <button
            type="button"
            className="ds-chip__remove"
            onClick={onRemove}
            disabled={disabled}
            aria-label="Remove"
          >
            <RemoveIcon />
          </button>
        </span>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={classNames}
        disabled={disabled}
        aria-pressed={type === 'filter' ? selected : undefined}
        {...rest}
      >
        {(type === 'action' || type === 'filter') && icon && (
          <span
            className={type === 'filter' ? 'ds-chip__icon ds-chip__icon--filter' : 'ds-chip__icon'}
          >
            {icon}
          </span>
        )}
        <span className="ds-chip__label">{children}</span>
      </button>
    );
  },
);
Chip.displayName = 'Chip';
