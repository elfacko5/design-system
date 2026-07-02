import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './IconButton.css';

export type IconButtonHierarchy = 'primary' | 'secondary' | 'elevated' | 'ghost';
export type IconButtonSize = 'default' | 'small';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hierarchy?: IconButtonHierarchy;
  size?: IconButtonSize;
  /** Applies the danger (destructive) color treatment. Only meaningful for `hierarchy="primary"` and `hierarchy="ghost"` — Figma doesn't define a danger Secondary/Elevated variant. */
  danger?: boolean;
  /** The icon to render — any SVG or element, sized via currentColor/dimensions. */
  icon: ReactNode;
  /** Accessible label — required since the button has no visible text. */
  'aria-label': string;
  /** Small numeric badge in the top-right corner, e.g. an unread count. */
  badgeCount?: number;
}

/**
 * IconButton — from Figma node 5603:2500. Covers all 4 hierarchies
 * (Primary/Secondary/Elevated/Ghost) at both sizes, the Danger treatment for
 * Primary and Ghost (the only two Figma defines it for), and the optional
 * corner badge subcomponent.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      hierarchy = 'primary',
      size = 'default',
      danger = false,
      icon,
      badgeCount,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        className={[
          'ds-icon-button',
          `ds-icon-button--${hierarchy}`,
          `ds-icon-button--${size}`,
          danger && 'ds-icon-button--danger',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="ds-icon-button__icon">{icon}</span>
        {badgeCount !== undefined && (
          <span className="ds-icon-button__badge" aria-hidden="true">
            {badgeCount}
          </span>
        )}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
