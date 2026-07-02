import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SheetTopBar } from './SheetTopBar';

describe('SheetTopBar', () => {
  it('always renders the grabber handle', () => {
    const { container } = render(<SheetTopBar />);
    expect(container.querySelector('.ds-sheet-top-bar__grabber')).toBeInTheDocument();
  });

  it('renders the title when provided', () => {
    render(<SheetTopBar title="Title" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders the close button only when onClose is provided', () => {
    const { rerender } = render(<SheetTopBar title="Title" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    const onClose = vi.fn();
    rerender(<SheetTopBar title="Title" onClose={onClose} closeLabel="Close" />);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('defaults to center alignment', () => {
    const { container } = render(<SheetTopBar title="Title" onClose={() => {}} />);
    expect(container.querySelector('.ds-sheet-top-bar__row')).toHaveClass(
      'ds-sheet-top-bar__row--center',
    );
  });
});
