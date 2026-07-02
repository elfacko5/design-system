import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its label', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('defaults to color="info"', () => {
    const { container } = render(<Badge>New</Badge>);
    expect(container.querySelector('.ds-badge--info')).toBeInTheDocument();
  });

  it('applies the requested color', () => {
    const { container } = render(<Badge color="danger">Error</Badge>);
    expect(container.querySelector('.ds-badge--danger')).toBeInTheDocument();
  });

  it('renders as a dot with no visible label', () => {
    const { container } = render(<Badge dot color="positive" />);
    const badge = container.querySelector('.ds-badge--dot');
    expect(badge).toBeInTheDocument();
    expect(badge?.textContent).toBe('');
  });
});
