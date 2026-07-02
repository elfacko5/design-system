import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchField } from './SearchField';

describe('SearchField', () => {
  it('renders a label wired to the input', () => {
    render(<SearchField label="Search" value="" onChange={vi.fn()} />);
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  it('calls onChange with the new value', () => {
    const onChange = vi.fn();
    render(<SearchField label="Search" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'hello' } });
    expect(onChange).toHaveBeenCalledWith('hello');
  });

  it('shows a clear button only when there is a value', () => {
    const { rerender } = render(<SearchField label="Search" value="" onChange={vi.fn()} />);
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
    rerender(<SearchField label="Search" value="hello" onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
  });

  it('clears the value when the clear button is clicked', () => {
    const onChange = vi.fn();
    const onClear = vi.fn();
    render(<SearchField label="Search" value="hello" onChange={onChange} onClear={onClear} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(onChange).toHaveBeenCalledWith('');
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('shows errorText instead of helperText when error is true', () => {
    render(
      <SearchField
        label="Search"
        value=""
        onChange={vi.fn()}
        helperText="Try a keyword"
        error
        errorText="No results"
      />,
    );
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.queryByText('Try a keyword')).not.toBeInTheDocument();
  });

  it('disables the input', () => {
    render(<SearchField label="Search" value="" onChange={vi.fn()} disabled />);
    expect(screen.getByLabelText('Search')).toBeDisabled();
  });
});
