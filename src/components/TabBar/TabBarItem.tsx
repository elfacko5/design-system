import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './TabBarItem.css';

export interface TabBarItemData {
  /** Stable identifier, echoed back via `onChange`. */
  key: string;
  label: ReactNode;
  /** Defaults to a generic circle glyph, matching Figma's placeholder icon. */
  icon?: ReactNode;
  'aria-label'?: string;
}

export interface TabBarItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'label'> {
  label: ReactNode;
  icon?: ReactNode;
  selected?: boolean;
}

function DefaultCircleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * TabBarItem — from Figma node 5605:16276 ("_Tab bar item", the Tab Bar's
 * documented subcomponent). Exported standalone since Figma marks it as its
 * own reusable piece, in addition to being used internally by `TabBar`.
 */
export function TabBarItem({ label, icon, selected = false, className, ...rest }: TabBarItemProps) {
  return (
    <button
      {...rest}
      type="button"
      aria-pressed={selected}
      className={['ds-tab-bar-item', selected && 'ds-tab-bar-item--selected', className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="ds-tab-bar-item__icon">{icon ?? <DefaultCircleIcon />}</span>
      <span className="ds-tab-bar-item__label">{label}</span>
    </button>
  );
}
