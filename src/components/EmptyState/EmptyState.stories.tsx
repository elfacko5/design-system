import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  args: {
    headline: 'Headline',
    description: 'Description',
    action: { label: 'Button label' },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const OnPage: Story = {
  render: (args) => <EmptyState {...args} variant="page" />,
};

export const Card: Story = {
  render: (args) => <EmptyState {...args} variant="card" />,
};
