import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionFooter } from './SectionFooter';

describe('SectionFooter', () => {
  it('renders its text', () => {
    render(<SectionFooter>Footer</SectionFooter>);
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('defaults to variant=default, align=left, no icon', () => {
    const { container } = render(<SectionFooter>Footer</SectionFooter>);
    const el = container.querySelector('.ds-section-footer');
    expect(el).toHaveClass('ds-section-footer--default');
    expect(el).toHaveClass('ds-section-footer--align-left');
    expect(container.querySelector('.ds-section-footer__icon')).not.toBeInTheDocument();
  });

  it('applies the danger variant class', () => {
    const { container } = render(<SectionFooter variant="danger">Uh oh</SectionFooter>);
    expect(container.querySelector('.ds-section-footer')).toHaveClass('ds-section-footer--danger');
  });

  it('renders the icon when showIcon is true', () => {
    const { container } = render(
      <SectionFooter showIcon variant="danger">
        Uh oh
      </SectionFooter>,
    );
    expect(container.querySelector('.ds-section-footer__icon')).toBeInTheDocument();
  });
});
