import type { HTMLAttributes, ReactNode } from 'react';
import './SectionHeader.css';

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * SectionHeader — small label used above a group of list items
 * (e.g. "RECENT", "SETTINGS").
 */
export function SectionHeader({ children, className, ...rest }: SectionHeaderProps) {
  return (
    <div
      {...rest}
      role="heading"
      aria-level={3}
      className={['ds-section-header', className].filter(Boolean).join(' ')}
    >
      <span className="ds-section-header__label">{children}</span>
    </div>
  );
}
