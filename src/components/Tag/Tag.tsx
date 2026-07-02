import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Tag.css';

export type TagVariant = 'category1' | 'category2' | 'category3' | 'category4' | 'category5';
export type TagStyle = 'filled' | 'ghost';

export interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** `category1` is the neutral, non-color-coded default; category2–5 are the color-coded variants. */
  variant?: TagVariant;
  /** Named `appearance` (not `style`) to avoid colliding with the native HTML `style` attribute. */
  appearance?: TagStyle;
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * Tag — from Figma node 5031:32719. Covers the Medium size (the only size
 * inspected), all 5 category colors, both Filled/Ghost styles for
 * Category 1 (the only category Figma defines a Ghost style for), and the
 * Default/Pressed states. Renders as a <button> since Figma's "Pressed"
 * state implies it's interactive (e.g. a removable/clickable filter), but
 * consumers can pass no onClick to use it purely as a label.
 */
export const Tag = forwardRef<HTMLButtonElement, TagProps>(
  ({ variant = 'category1', appearance = 'filled', icon, children, className, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        className={['ds-tag', `ds-tag--${variant}`, `ds-tag--${appearance}`, className]
          .filter(Boolean)
          .join(' ')}
      >
        {icon && <span className="ds-tag__icon">{icon}</span>}
        <span className="ds-tag__label">{children}</span>
      </button>
    );
  },
);

Tag.displayName = 'Tag';
