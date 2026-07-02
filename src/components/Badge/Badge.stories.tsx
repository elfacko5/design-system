import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  args: { children: 'Label' },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const AllColors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge {...args} color="info" />
      <Badge {...args} color="positive" />
      <Badge {...args} color="warning" />
      <Badge {...args} color="danger" />
      <Badge {...args} color="neutral" />
      <Badge {...args} color="ghost" />
    </div>
  ),
};

export const Dots: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge dot color="info" />
      <Badge dot color="positive" />
      <Badge dot color="warning" />
      <Badge dot color="danger" />
    </div>
  ),
};
