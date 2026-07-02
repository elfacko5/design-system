import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders a label wired to the input', () => {
    render(<Radio label="Option A" />);
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
  });

  it('is a native radio input', () => {
    render(<Radio label="Option A" />);
    expect(screen.getByLabelText('Option A')).toHaveAttribute('type', 'radio');
  });

  it('only allows one selection within a group', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Radio name="group" label="Option A" />
        <Radio name="group" label="Option B" />
      </>,
    );
    const a = screen.getByLabelText('Option A');
    const b = screen.getByLabelText('Option B');
    await user.click(a);
    expect(a).toBeChecked();
    await user.click(b);
    expect(b).toBeChecked();
    expect(a).not.toBeChecked();
  });

  it('disables the input', () => {
    render(<Radio label="Option A" disabled />);
    expect(screen.getByLabelText('Option A')).toBeDisabled();
  });
});
