import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from './TextField';

describe('TextField', () => {
  it('renders a label wired to the input via htmlFor/id', () => {
    render(<TextField label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
  });

  it('accepts typed input', async () => {
    const user = userEvent.setup();
    render(<TextField label="Email" />);
    const input = screen.getByLabelText('Email');
    await user.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });

  it('shows helper text by default and errorText when error is true', () => {
    const { rerender } = render(<TextField label="Email" helperText="We will never share this" />);
    expect(screen.getByText('We will never share this')).toBeInTheDocument();
    rerender(
      <TextField
        label="Email"
        helperText="We will never share this"
        error
        errorText="Invalid email"
      />,
    );
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.queryByText('We will never share this')).not.toBeInTheDocument();
  });

  it('sets aria-invalid when error is true', () => {
    render(<TextField label="Email" error />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables the input', () => {
    render(<TextField label="Email" disabled />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });
});
