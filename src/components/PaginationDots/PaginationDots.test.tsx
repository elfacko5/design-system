import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaginationDots } from './PaginationDots';

describe('PaginationDots', () => {
  it('renders one dot per total', () => {
    render(<PaginationDots total={4} activeIndex={0} />);
    expect(screen.getAllByRole('tab')).toHaveLength(4);
  });

  it('marks the active dot with aria-selected', () => {
    render(<PaginationDots total={4} activeIndex={2} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('does not render arrows by default', () => {
    render(<PaginationDots total={4} activeIndex={0} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders arrows and disables previous at the start', () => {
    render(<PaginationDots total={4} activeIndex={0} showArrows />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
  });

  it('disables next at the end', () => {
    render(<PaginationDots total={4} activeIndex={3} showArrows />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('calls onChange with the adjacent index when an arrow is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PaginationDots total={4} activeIndex={1} showArrows onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(onChange).toHaveBeenCalledWith(2);
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onChange).toHaveBeenCalledWith(0);
  });
});
