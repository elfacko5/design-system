import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders as an accessible switch', () => {
    render(<Toggle checked={false} onCheckedChange={() => {}} aria-label="Notifications" />);
    const toggle = screen.getByRole('switch', { name: 'Notifications' });
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onCheckedChange with the flipped value on click', async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(<Toggle checked={false} onCheckedChange={onCheckedChange} aria-label="Notifications" />);
    await user.click(screen.getByRole('switch', { name: 'Notifications' }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('reflects the checked prop in aria-checked', () => {
    render(<Toggle checked onCheckedChange={() => {}} aria-label="Notifications" />);
    expect(screen.getByRole('switch', { name: 'Notifications' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  it('does not call onCheckedChange when disabled', async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Toggle
        checked={false}
        onCheckedChange={onCheckedChange}
        disabled
        aria-label="Notifications"
      />,
    );
    const toggle = screen.getByRole('switch', { name: 'Notifications' });
    expect(toggle).toBeDisabled();
    await user.click(toggle);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('forwards a ref to the underlying <button>', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Toggle checked={false} onCheckedChange={() => {}} ref={ref} aria-label="Go" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('is keyboard accessible via Tab + Enter', async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(<Toggle checked={false} onCheckedChange={onCheckedChange} aria-label="Go" />);
    await user.tab();
    expect(screen.getByRole('switch', { name: 'Go' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
