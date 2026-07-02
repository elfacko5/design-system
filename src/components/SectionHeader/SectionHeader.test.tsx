import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeader } from './SectionHeader';

describe('SectionHeader', () => {
  it('renders its label text', () => {
    render(<SectionHeader>Recent</SectionHeader>);
    expect(screen.getByText('Recent')).toBeInTheDocument();
  });

  it('exposes a heading role for assistive tech', () => {
    render(<SectionHeader>Recent</SectionHeader>);
    expect(screen.getByRole('heading', { name: 'Recent' })).toBeInTheDocument();
  });
});
