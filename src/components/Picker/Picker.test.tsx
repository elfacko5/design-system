import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Picker } from './Picker';

describe('Picker', () => {
  it('renders both date and time segments when given', () => {
    render(<Picker date="Apr 1, 2025" time="9:41 AM" />);
    expect(screen.getByText('Apr 1, 2025')).toBeInTheDocument();
    expect(screen.getByText('9:41 AM')).toBeInTheDocument();
  });

  it('omits a segment when its prop is not provided', () => {
    render(<Picker date="Apr 1, 2025" />);
    expect(screen.getByText('Apr 1, 2025')).toBeInTheDocument();
    expect(screen.queryByText('9:41 AM')).not.toBeInTheDocument();
  });

  it('applies the selected modifier class to each segment when selected', () => {
    const { container } = render(<Picker date="Apr 1, 2025" time="9:41 AM" selected />);
    const segments = container.querySelectorAll('.ds-picker__segment');
    expect(segments).toHaveLength(2);
    segments.forEach((s) => expect(s).toHaveClass('ds-picker__segment--selected'));
  });

  it('renders each segment as a real, focusable button', () => {
    render(
      <Picker date="Apr 1, 2025" time="9:41 AM" onDateClick={() => {}} onTimeClick={() => {}} />,
    );
    expect(screen.getByRole('button', { name: 'Apr 1, 2025' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '9:41 AM' })).toBeInTheDocument();
  });

  it('calls onDateClick / onTimeClick when a pill is activated', () => {
    const onDateClick = vi.fn();
    const onTimeClick = vi.fn();
    render(
      <Picker
        date="Apr 1, 2025"
        time="9:41 AM"
        onDateClick={onDateClick}
        onTimeClick={onTimeClick}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Apr 1, 2025' }));
    fireEvent.click(screen.getByRole('button', { name: '9:41 AM' }));
    expect(onDateClick).toHaveBeenCalledTimes(1);
    expect(onTimeClick).toHaveBeenCalledTimes(1);
  });

  it('disables a pill when no click handler is provided for it', () => {
    render(<Picker date="Apr 1, 2025" time="9:41 AM" onDateClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Apr 1, 2025' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '9:41 AM' })).toBeDisabled();
  });
});
