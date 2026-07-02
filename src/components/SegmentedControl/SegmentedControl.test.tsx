import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SegmentedControl } from './SegmentedControl';

const options = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
];

describe('SegmentedControl', () => {
  it('renders a tab for each option', () => {
    render(<SegmentedControl options={options} value="a" onChange={vi.fn()} aria-label="Test" />);
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('marks the selected option with aria-selected', () => {
    render(<SegmentedControl options={options} value="b" onChange={vi.fn()} aria-label="Test" />);
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange with the clicked option value', () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={options} value="a" onChange={onChange} aria-label="Test" />);
    fireEvent.click(screen.getByRole('tab', { name: 'C' }));
    expect(onChange).toHaveBeenCalledWith('c');
  });
});
