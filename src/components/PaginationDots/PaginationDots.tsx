import { IconButton } from '../IconButton';
import './PaginationDots.css';

function CaretLeftIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.5 5L7.5 10L12.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CaretRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface PaginationDotsProps {
  total: number;
  activeIndex: number;
  /** Renders the previous/next ghost icon buttons flanking the dots. */
  showArrows?: boolean;
  onChange?: (index: number) => void;
  className?: string;
}

/**
 * PaginationDots — from Figma node 5613:22981. Covers both variants
 * ("Dots only" and "Dots + Arrows"). Previous/next buttons auto-disable at
 * the first/last dot, matching the Start/End examples shown in Figma.
 */
export function PaginationDots({
  total,
  activeIndex,
  showArrows = false,
  onChange,
  className,
}: PaginationDotsProps) {
  const dots = Array.from({ length: total }, (_, index) => index);

  return (
    <div className={['ds-pagination-dots', className].filter(Boolean).join(' ')}>
      {showArrows && (
        <IconButton
          hierarchy="ghost"
          icon={<CaretLeftIcon />}
          aria-label="Previous"
          disabled={activeIndex <= 0}
          onClick={() => onChange?.(activeIndex - 1)}
        />
      )}
      <span className="ds-pagination-dots__dots" role="tablist" aria-label="Pagination">
        {dots.map((index) => (
          <span
            key={index}
            role="tab"
            aria-selected={index === activeIndex}
            className={[
              'ds-pagination-dots__dot',
              index === activeIndex && 'ds-pagination-dots__dot--active',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        ))}
      </span>
      {showArrows && (
        <IconButton
          hierarchy="ghost"
          icon={<CaretRightIcon />}
          aria-label="Next"
          disabled={activeIndex >= total - 1}
          onClick={() => onChange?.(activeIndex + 1)}
        />
      )}
    </div>
  );
}
