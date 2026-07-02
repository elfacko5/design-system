import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import './Dropdown.css';

function CaretDownIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface DropdownProps {
  label?: ReactNode;
  detail?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  leadingIcon?: ReactNode;
  className?: string;
}

/**
 * Dropdown — from Figma node 5613:23092. Shares Text field's tokens for the
 * closed-state field (both link to the same Adobe Spectrum text-field doc
 * in Figma) plus its own tokens for the fixed 52px height and the open
 * menu/menu-item subcomponents.
 *
 * Figma's `_Menu item` subcomponent supports a large set of optional
 * trailing decorations (a value, info/danger/star icons, a checkmark, a
 * badge, and a drill-in chevron). Only label, description, and a selected
 * checkmark are implemented here — the rest are decorative combinations
 * that go beyond what a functional select control needs, so they were left
 * out to keep the component's surface area proportional to its purpose.
 */
export function Dropdown({
  label,
  detail,
  helperText,
  errorText,
  error = false,
  disabled = false,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  leadingIcon,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonId = useId();
  const listId = useId();
  const footer = error ? (errorText ?? helperText) : helperText;
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className={['ds-dropdown', className].filter(Boolean).join(' ')} ref={rootRef}>
      {(label || detail) && (
        <div className="ds-dropdown__header">
          {label && (
            <label htmlFor={buttonId} className="ds-dropdown__label">
              {label}
            </label>
          )}
          {detail && <span className="ds-dropdown__detail">{detail}</span>}
        </div>
      )}
      <button
        id={buttonId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        disabled={disabled}
        aria-invalid={error || undefined}
        className={[
          'ds-dropdown__field',
          error && 'ds-dropdown__field--error',
          disabled && 'ds-dropdown__field--disabled',
          open && 'ds-dropdown__field--open',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        {leadingIcon && <span className="ds-dropdown__icon">{leadingIcon}</span>}
        <span
          className={['ds-dropdown__value', !selected && 'ds-dropdown__value--placeholder']
            .filter(Boolean)
            .join(' ')}
        >
          {selected ? selected.label : placeholder}
        </span>
        <span className="ds-dropdown__icon">
          <CaretDownIcon />
        </span>
      </button>
      {open && (
        <ul id={listId} role="listbox" className="ds-dropdown__menu">
          {options.map((option) => (
            <li key={option.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                disabled={option.disabled}
                className={[
                  'ds-dropdown__menu-item',
                  option.value === value && 'ds-dropdown__menu-item--selected',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span className="ds-dropdown__menu-item-text">
                  <span className="ds-dropdown__menu-item-label">{option.label}</span>
                  {option.description && (
                    <span className="ds-dropdown__menu-item-description">{option.description}</span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {footer && (
        <div
          className={['ds-dropdown__footer', error && 'ds-dropdown__footer--error']
            .filter(Boolean)
            .join(' ')}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
