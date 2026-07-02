import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import './Dialog.css';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** `centered` matches Figma's "Custom centered" type, `left` matches "Custom left aligned". */
  align?: 'centered' | 'left';
  title?: ReactNode;
  description?: ReactNode;
  primaryAction: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
  /** Renders the "Don't show this message again" checkbox from Figma. */
  dontShowAgain?: { checked: boolean; onChange: (checked: boolean) => void };
  className?: string;
}

/**
 * Dialog — from Figma node 5786:2405. Covers the "Custom centered" and
 * "Custom left aligned" types pulled directly from Figma. The third variant
 * in that section, "Type=System iOS" (a native iOS alert), was not built —
 * it isn't a web-renderable component, the same reasoning that excluded
 * Radio's Android variant.
 *
 * The backdrop scrim wasn't part of the inspected Figma frame (the dialog
 * was shown in isolation); a conventional dark overlay was added since a
 * modal needs one to function, and is flagged in the `dialog.overlayColor`
 * token description.
 */
export function Dialog({
  open,
  onClose,
  align = 'centered',
  title,
  description,
  primaryAction,
  secondaryAction,
  dontShowAgain,
  className,
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="ds-dialog__overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={['ds-dialog', `ds-dialog--${align}`, className].filter(Boolean).join(' ')}
        onClick={(event) => event.stopPropagation()}
      >
        {(title || description) && (
          <div className="ds-dialog__text">
            {title && (
              <p id={titleId} className="ds-dialog__title">
                {title}
              </p>
            )}
            {description && (
              <p id={descriptionId} className="ds-dialog__description">
                {description}
              </p>
            )}
          </div>
        )}
        {dontShowAgain && (
          <Checkbox
            checked={dontShowAgain.checked}
            onChange={(event) => dontShowAgain.onChange(event.target.checked)}
            label="Don't show this message again"
          />
        )}
        <div className="ds-dialog__buttons">
          <Button variant="primary" onClick={primaryAction.onClick}>
            {primaryAction.label}
          </Button>
          {secondaryAction && (
            <Button variant="secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
