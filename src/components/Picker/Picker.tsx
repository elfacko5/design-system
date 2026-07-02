import type { HTMLAttributes, ReactNode } from 'react';
import './Picker.css';

export interface PickerProps extends HTMLAttributes<HTMLDivElement> {
  /** The date value to show in the left pill, e.g. "Apr 1, 2025". Omit to hide the date pill entirely. */
  date?: ReactNode;
  /** The time value to show in the right pill, e.g. "9:41 AM". Omit to hide the time pill entirely. */
  time?: ReactNode;
  /** Emphasized/active look — border + medium weight instead of the plain fill. */
  selected?: boolean;
  /** Called when the date pill is activated (click or Enter/Space) — typically opens a date picker overlay. */
  onDateClick?: () => void;
  /** Called when the time pill is activated — typically opens a time picker overlay. */
  onTimeClick?: () => void;
  /** Accessible label for the date pill, e.g. "Choose date". Defaults to reading the date value itself. */
  dateLabel?: string;
  /** Accessible label for the time pill, e.g. "Choose time". Defaults to reading the time value itself. */
  timeLabel?: string;
}

/**
 * Picker — from Figma node 9833:48414 ("Date and time - Collapsed", the
 * "Pickers" page). This is the collapsed *trigger* row that shows the
 * currently-selected date/time as two pill buttons — not the expanded
 * wheel/calendar overlay itself (those live on separate pages explicitly
 * marked WIP in Figma: "Native iOS – Calendar", "Native iOS/Android – Time
 * and Date wheels/modal" — out of scope here, same as other native-only
 * surfaces skipped elsewhere in this library).
 *
 * Each pill renders as a real `<button>` — a collapsed date/time trigger is
 * inherently interactive (it opens a picker overlay), so it needs native
 * keyboard/focus support rather than static markup. A pill is only
 * rendered as `disabled` when no corresponding `onDateClick`/`onTimeClick`
 * handler is supplied, since an unclickable trigger has no purpose.
 *
 * Figma names its variant axis by platform (iOS 18 / Android) crossed with
 * state (Default / Selected), but only 2 of the 4 combinations were
 * fetched (iOS/Default and Android/Selected) since those were the pair that
 * showed an actual visual difference — Default is a plain fill with regular
 * weight, Selected adds a border and switches to medium weight. There was
 * no evidence the iOS/Android axis itself changes anything visually at this
 * sub-component, so it was unified into one platform-agnostic `selected`
 * boolean rather than forked by platform (the same treatment given to
 * Radio/Dialog/TopAppBar's platform variants).
 */
export function Picker({
  date,
  time,
  selected = false,
  onDateClick,
  onTimeClick,
  dateLabel,
  timeLabel,
  className,
  ...rest
}: PickerProps) {
  return (
    <div {...rest} className={['ds-picker', className].filter(Boolean).join(' ')}>
      {date !== undefined && (
        <button
          type="button"
          disabled={!onDateClick}
          onClick={onDateClick}
          aria-label={dateLabel ?? (typeof date === 'string' ? date : undefined)}
          className={['ds-picker__segment', selected && 'ds-picker__segment--selected']
            .filter(Boolean)
            .join(' ')}
        >
          {date}
        </button>
      )}
      {time !== undefined && (
        <button
          type="button"
          disabled={!onTimeClick}
          onClick={onTimeClick}
          aria-label={timeLabel ?? (typeof time === 'string' ? time : undefined)}
          className={['ds-picker__segment', selected && 'ds-picker__segment--selected']
            .filter(Boolean)
            .join(' ')}
        >
          {time}
        </button>
      )}
    </div>
  );
}
