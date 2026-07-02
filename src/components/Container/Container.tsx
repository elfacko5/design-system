import type { HTMLAttributes, ReactNode } from 'react';
import './Container.css';

export type ContainerPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'lgPlus' | 'xl';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Inner padding step — from Figma's 7 "Padding variant" options. */
  padding?: ContainerPadding;
  /** Optional section header, rendered above the content in the label style Figma shows ("Section title"). */
  header?: ReactNode;
  /** Optional section footer, rendered below the content. */
  footer?: ReactNode;
  /** Whether to draw the white card background + border. Figma's "showContainer" boolean — set false to use Container purely as a padding/layout wrapper with no visible chrome. */
  bordered?: boolean;
  children?: ReactNode;
}

/**
 * Container — from Figma node 40002030:3170. A generic padded wrapper with
 * an optional header/footer, used throughout the design system as a layout
 * primitive (Figma's own "Slot/Container Placeholder" content is the
 * dev-documentation "safety zone" artwork for designers and isn't
 * reproduced here — real content goes in `children`).
 */
export function Container({
  padding = 'none',
  header,
  footer,
  bordered = true,
  children,
  className,
  ...rest
}: ContainerProps) {
  return (
    <div {...rest} className={['ds-container', className].filter(Boolean).join(' ')}>
      {header && <div className="ds-container__header">{header}</div>}
      <div
        className={[
          'ds-container__content',
          `ds-container__content--padding-${padding}`,
          bordered && 'ds-container__content--bordered',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
      {footer && <div className="ds-container__footer">{footer}</div>}
    </div>
  );
}
