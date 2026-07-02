import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  it('renders nothing when closed', () => {
    render(<Dialog open={false} onClose={vi.fn()} title="Title" primaryAction={{ label: 'OK' }} />);
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('renders title, description, and actions when open', () => {
    render(
      <Dialog
        open
        onClose={vi.fn()}
        title="Placeholder"
        description="Body text"
        primaryAction={{ label: 'Confirm' }}
        secondaryAction={{ label: 'Cancel' }}
      />,
    );
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText('Placeholder')).toBeInTheDocument();
    expect(screen.getByText('Body text')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('calls onClose when the backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="Title" primaryAction={{ label: 'OK' }} />);
    fireEvent.click(screen.getByRole('alertdialog').parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when clicking inside the dialog', () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="Title" primaryAction={{ label: 'OK' }} />);
    fireEvent.click(screen.getByRole('alertdialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose on Escape', () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="Title" primaryAction={{ label: 'OK' }} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders the "don\'t show again" checkbox when provided', () => {
    render(
      <Dialog
        open
        onClose={vi.fn()}
        title="Title"
        primaryAction={{ label: 'OK' }}
        dontShowAgain={{ checked: false, onChange: vi.fn() }}
      />,
    );
    expect(screen.getByLabelText("Don't show this message again")).toBeInTheDocument();
  });
});
