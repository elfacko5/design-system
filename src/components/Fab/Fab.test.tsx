import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Fab } from './Fab';

describe('Fab', () => {
  it('renders icon-only by default with no label', () => {
    render(<Fab aria-label="Compose" />);
    const button = screen.getByRole('button', { name: 'Compose' });
    expect(button).not.toHaveClass('ds-fab--labeled');
  });

  it('renders the label text when provided', () => {
    render(<Fab label="Label" aria-label="Compose" />);
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('ds-fab--labeled');
  });

  it('applies aria-pressed and the selected class when selected', () => {
    render(<Fab selected aria-label="Close" />);
    const button = screen.getByRole('button', { name: 'Close' });
    expect(button).toHaveClass('ds-fab--selected');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('fires onClick', () => {
    const onClick = vi.fn();
    render(<Fab aria-label="Compose" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Compose' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('respects the disabled attribute', () => {
    render(<Fab aria-label="Compose" disabled />);
    expect(screen.getByRole('button', { name: 'Compose' })).toBeDisabled();
  });
});
