import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders an accessible checkbox with its label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it('is unchecked by default and toggles on click', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Subscribe" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Subscribe' });
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('calls onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Subscribe" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox', { name: 'Subscribe' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('supports the disabled state', () => {
    render(<Checkbox label="Locked" disabled />);
    expect(screen.getByRole('checkbox', { name: 'Locked' })).toBeDisabled();
  });

  it('forwards a ref to the underlying <input>', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox label="Go" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('is keyboard accessible via Tab + Space', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Go" />);
    await user.tab();
    const checkbox = screen.getByRole('checkbox', { name: 'Go' });
    expect(checkbox).toHaveFocus();
    await user.keyboard(' ');
    expect(checkbox).toBeChecked();
  });
});
