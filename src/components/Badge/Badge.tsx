import type { HTMLAttributes, ReactNode } from 'react';
import './Badge.css';

export type BadgeColor = 'info' | 'positive' | 'warning' | 'danger' | 'neutral' | 'ghost';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  color?: BadgeColor;
  /** Renders a small dot instead of a label — a hint indicator with no text. */
  dot?: boolean;
  /** Icon shown before the label. Ignored when `dot` is true. */
  icon?: ReactNode;
  children?: ReactNode;
}

/**
 * Badge — a small pill/dot used to flag status or a count.
 * From Figma node 5063:188423. Only the Pill and Dot types are implemented;
 * the Number type (a numeric counter badge) was in the same frame but is
 * left for a follow-up since it's a distinct enough use case to warrant its
 * own pass rather than bolting it on here.
 */
export function Badge({
  color = 'info',
  dot = false,
  icon,
  children,
  className,
  ...rest
}: BadgeProps) {
  if (dot) {
    return (
      <span
        {...rest}
        className={['ds-badge', 'ds-badge--dot', `ds-badge--${color}`, className]
          .filter(Boolean)
          .join(' ')}
      />
    );
  }

  return (
    <span
      {...rest}
      className={['ds-badge', `ds-badge--${color}`, className].filter(Boolean).join(' ')}
    >
      {icon && <span className="ds-badge__icon">{icon}</span>}
      {children}
    </span>
  );
}
