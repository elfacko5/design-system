import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import './Toggle.css';

export interface ToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'type'
> {
  /** Whether the toggle is on. Controlled — there is no uncontrolled mode. */
  checked: boolean;
  /** Called with the next checked value when the toggle is activated. */
  onCheckedChange: (checked: boolean) => void;
}

/**
 * Toggle — an on/off switch. There is no native HTML switch element, so this
 * follows the standard accessible pattern of a <button role="switch"
 * aria-checked> rather than reimplementing a checkbox with divs.
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked, onCheckedChange, disabled, className, onClick, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={['ds-toggle', checked && 'ds-toggle--checked', className]
          .filter(Boolean)
          .join(' ')}
        onClick={(event) => {
          onClick?.(event);
          if (!disabled) onCheckedChange(!checked);
        }}
      >
        <span className="ds-toggle__thumb" />
      </button>
    );
  },
);

Toggle.displayName = 'Toggle';
