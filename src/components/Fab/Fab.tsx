import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Fab.css';

export interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Optional label — when provided, the FAB renders as a pill with icon + text; when omitted, it's an icon-only circle. */
  label?: ReactNode;
  /** The icon to render. Defaults to a plus glyph, matching Figma's default. */
  icon?: ReactNode;
  /** Selected/expanded state — from Figma's State=Selected. Rotates the default plus icon 45° to read as a close (X) affordance, the standard "expand → close" FAB pattern. Has no visual effect if a custom `icon` is passed, other than the rotation. */
  selected?: boolean;
  /** Accessible label — required when no visible `label` is passed. */
  'aria-label'?: string;
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Fab (Floating Action Button) — from Figma node 5610:17797. Covers all 4
 * Figma states (Default/Pressed/Disabled/Selected) at both Label=True/False
 * configurations. Pressed is implemented as a native `:active` CSS state
 * (matching how Button/IconButton handle their hover/pressed treatments)
 * rather than a prop; Disabled uses the native `disabled` attribute.
 */
export const Fab = forwardRef<HTMLButtonElement, FabProps>(
  ({ label, icon, selected = false, className, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        aria-pressed={selected}
        className={['ds-fab', label && 'ds-fab--labeled', selected && 'ds-fab--selected', className]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="ds-fab__icon">{icon ?? <PlusIcon />}</span>
        {label && <span className="ds-fab__label">{label}</span>}
      </button>
    );
  },
);

Fab.displayName = 'Fab';
