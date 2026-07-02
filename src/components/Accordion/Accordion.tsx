import { useId } from 'react';
import type { ReactNode } from 'react';
import './Accordion.css';

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={['ds-accordion__chevron', expanded && 'ds-accordion__chevron--expanded']
        .filter(Boolean)
        .join(' ')}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.5 5.25L7 8.75L10.5 5.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface AccordionProps {
  title: ReactNode;
  /** Small secondary text next to the title, e.g. a status or count. */
  subtitle?: ReactNode;
  leadingIcon?: ReactNode;
  expanded: boolean;
  onToggle: (expanded: boolean) => void;
  children?: ReactNode;
  /** Matches Figma's "Padding content" prop — `default` (16px) or `none` (0). */
  contentPadding?: 'default' | 'none';
  className?: string;
}

/**
 * Accordion — from Figma node 40002027:1432. Covers the Default state at
 * both Padding content settings (Default/None) and expanded/collapsed. The
 * "Open tags" variant referenced in the Figma section title refers to the
 * optional subtitle/divider-dot row, which is supported via the `subtitle`
 * prop rather than as a separately hardcoded variant.
 */
export function Accordion({
  title,
  subtitle,
  leadingIcon,
  expanded,
  onToggle,
  children,
  contentPadding = 'default',
  className,
}: AccordionProps) {
  const contentId = useId();

  return (
    <div className={['ds-accordion', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className="ds-accordion__header"
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={() => onToggle(!expanded)}
      >
        {leadingIcon && <span className="ds-accordion__leading">{leadingIcon}</span>}
        <span className="ds-accordion__center">
          <span className="ds-accordion__title">{title}</span>
          {subtitle && <span className="ds-accordion__subtitle">{subtitle}</span>}
        </span>
        <span className="ds-accordion__trailing">
          <Chevron expanded={expanded} />
        </span>
      </button>
      {expanded && (
        <div
          id={contentId}
          className={[
            'ds-accordion__content',
            contentPadding === 'none' && 'ds-accordion__content--flush',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </div>
      )}
    </div>
  );
}
