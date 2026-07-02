import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B', description: 'Details about B' },
  { value: 'c', label: 'Option C', disabled: true },
];

describe('Dropdown', () => {
  it('shows a placeholder when no value is selected', () => {
    render(<Dropdown options={options} onChange={vi.fn()} placeholder="Choose one" />);
    expect(screen.getByText('Choose one')).toBeInTheDocument();
  });

  it('shows the selected option label', () => {
    render(<Dropdown options={options} value="b" onChange={vi.fn()} />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Option B');
  });

  it('opens the menu on click and lists all options', () => {
    render(<Dropdown options={options} onChange={vi.fn()} />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('calls onChange and closes the menu when an option is picked', () => {
    const onChange = vi.fn();
    render(<Dropdown options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'Option A' }));
    expect(onChange).toHaveBeenCalledWith('a');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('disables individual options', () => {
    render(<Dropdown options={options} onChange={vi.fn()} />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'Option C' })).toBeDisabled();
  });

  it('disables the whole control', () => {
    render(<Dropdown options={options} onChange={vi.fn()} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
