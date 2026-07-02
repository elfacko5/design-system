import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import './Radio.css';

export type RadioType = 'default' | 'emphasis' | 'error';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** `default` = neutral fill ("no emphasis" in Figma), `emphasis` = primary-colored fill, `error` = error-colored fill/border. */
  type?: RadioType;
  label?: ReactNode;
}

/**
 * Radio — from Figma node 5146:32063 (iOS style; the Android variant in the
 * same file was not built, matching the precedent set by Dialog's
 * System-iOS variant being out of scope).
 *
 * IMPORTANT CAVEAT: Figma renders this control as a flattened image asset
 * rather than decomposable layers, and this session's sandbox blocks
 * fetching the raw asset for pixel inspection. The border/fill colors below
 * are a best-effort match based on this design system's established
 * conventions (see the `radio` token block for per-value notes) rather than
 * confirmed pixel values — worth a manual visual diff against Figma.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ type = 'default', label, id, className, disabled, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <span className={['ds-radio', className].filter(Boolean).join(' ')}>
        <span
          className={['ds-radio__control', `ds-radio__control--${type}`].filter(Boolean).join(' ')}
        >
          <input
            {...rest}
            ref={ref}
            id={inputId}
            type="radio"
            disabled={disabled}
            className="ds-radio__input"
          />
          <span className="ds-radio__dot" aria-hidden="true" />
        </span>
        {label !== undefined && (
          <label htmlFor={inputId} className="ds-radio__label">
            {label}
          </label>
        )}
      </span>
    );
  },
);

Radio.displayName = 'Radio';
