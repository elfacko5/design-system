import type { HTMLAttributes } from 'react';
import { TabBarItem } from './TabBarItem';
import type { TabBarItemData } from './TabBarItem';
import './TabBar.css';

export interface TabBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabBarItemData[];
  /** Key of the currently-selected item. */
  value: string;
  onChange?: (key: string) => void;
  /** Shows the iOS software home-indicator bar beneath the tabs — from Figma's "👀 Home indicator" toggle. */
  homeIndicator?: boolean;
}

/**
 * TabBar — from Figma node 5610:17378 ("Tab Bar"). A top-level mobile
 * navigation bar of 2–5 `TabBarItem`s, with an optional iOS home-indicator
 * strip.
 *
 * Two things scoped out, both disclosed:
 *  1. Figma's "With Plus" Type (a raised center action button merged into
 *     the tab row) wasn't buildable — get_design_context returned an empty
 *     shell for that variant with no expanded sub-layers to inspect, so
 *     there wasn't enough information to reproduce it accurately.
 *  2. The Platform (iOS/Android) axis was collapsed into the single
 *     `homeIndicator` boolean already used for the toggle's real effect
 *     (showing/hiding the software home-indicator strip) rather than a
 *     separate `platform` prop, consistent with how other platform axes
 *     were unified elsewhere in this library.
 */
export function TabBar({
  items,
  value,
  onChange,
  homeIndicator = false,
  className,
  ...rest
}: TabBarProps) {
  return (
    <div {...rest} className={['ds-tab-bar', className].filter(Boolean).join(' ')}>
      <div className="ds-tab-bar__tabs">
        {items.map((item) => (
          <TabBarItem
            key={item.key}
            label={item.label}
            icon={item.icon}
            selected={item.key === value}
            aria-label={item['aria-label']}
            onClick={() => onChange?.(item.key)}
          />
        ))}
      </div>
      {homeIndicator && (
        <div className="ds-tab-bar__home-indicator">
          <span className="ds-tab-bar__home-indicator-bar" />
        </div>
      )}
    </div>
  );
}
