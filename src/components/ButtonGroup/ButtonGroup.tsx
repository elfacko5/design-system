import { Button } from '../Button';
import { PaginationDots } from '../PaginationDots';
import './ButtonGroup.css';

export interface ButtonGroupProps {
  primaryAction: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
  /** Renders a pagination-dots row above the buttons, e.g. for a multi-step onboarding flow. */
  pagination?: { total: number; activeIndex: number };
  /** Shows the iOS home-indicator bar at the bottom. Defaults to true to match Figma; set to false on Android/web contexts. */
  showHomeIndicator?: boolean;
  className?: string;
}

/**
 * ButtonGroup — from Figma node 6310:6697 ("Bottom Button Group"). This is
 * a fixed bottom action bar for mobile screens: a translucent surface with
 * a top border, 1–2 stacked full-width buttons, and an optional pagination
 * row and iOS home-indicator bar. Figma's "On base" and "On level 1"
 * surface variants render identically in the inspected samples, so only
 * one surface treatment is implemented.
 */
export function ButtonGroup({
  primaryAction,
  secondaryAction,
  pagination,
  showHomeIndicator = true,
  className,
}: ButtonGroupProps) {
  return (
    <div className={['ds-button-group', className].filter(Boolean).join(' ')}>
      {pagination && (
        <div className="ds-button-group__pagination">
          <PaginationDots total={pagination.total} activeIndex={pagination.activeIndex} />
        </div>
      )}
      <div className="ds-button-group__stack">
        <Button variant="primary" onClick={primaryAction.onClick}>
          {primaryAction.label}
        </Button>
        {secondaryAction && (
          <Button variant="secondary" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
      {showHomeIndicator && (
        <div className="ds-button-group__home-indicator">
          <span className="ds-button-group__home-indicator-bar" />
        </div>
      )}
    </div>
  );
}
