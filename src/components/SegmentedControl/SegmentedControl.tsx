import './SegmentedControl.css';

export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  'aria-label'?: string;
  className?: string;
}

/**
 * SegmentedControl — from Figma node 7566:1698 (iOS-style segmented
 * control). Figma enumerates fixed 2–5 segment variants; this component
 * generalizes that into a flexible `options` array since the underlying
 * pattern is the same regardless of count. The floating white "thumb"
 * behind the selected segment matches the separately-documented
 * "_Selected Button" subcomponent (Mode=Light only — Dark/Dark Elevated
 * modes weren't built, matching this system's convention of handling dark
 * mode via global CSS custom property overrides rather than per-component
 * variants).
 */
export function SegmentedControl({
  options,
  value,
  onChange,
  className,
  ...rest
}: SegmentedControlProps) {
  const selectedIndex = options.findIndex((option) => option.value === value);

  return (
    <div
      role="tablist"
      aria-label={rest['aria-label']}
      className={['ds-segmented-control', className].filter(Boolean).join(' ')}
    >
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <div key={option.value} className="ds-segmented-control__slot">
            {selected && <span className="ds-segmented-control__thumb" aria-hidden="true" />}
            <button
              type="button"
              role="tab"
              aria-selected={selected}
              className={[
                'ds-segmented-control__segment',
                selected && 'ds-segmented-control__segment--selected',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
            {index < options.length - 1 && !selected && selectedIndex !== index + 1 && (
              <span className="ds-segmented-control__separator" aria-hidden="true" />
            )}
          </div>
        );
      })}
    </div>
  );
}
