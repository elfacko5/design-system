import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

function ListIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 5h12M4 10h12M4 15h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  args: { icon: <ListIcon />, 'aria-label': 'List view' },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Hierarchies: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <IconButton {...args} hierarchy="primary" />
      <IconButton {...args} hierarchy="secondary" />
      <IconButton {...args} hierarchy="elevated" />
      <IconButton {...args} hierarchy="ghost" />
    </div>
  ),
};

export const Danger: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <IconButton {...args} hierarchy="primary" danger />
      <IconButton {...args} hierarchy="ghost" danger />
    </div>
  ),
};

export const Small: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconButton {...args} size="small" hierarchy="primary" />
      <IconButton {...args} size="small" hierarchy="secondary" />
      <IconButton {...args} size="small" hierarchy="ghost" />
    </div>
  ),
};

export const WithBadge: Story = {
  render: (args) => <IconButton {...args} hierarchy="secondary" badgeCount={5} />,
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <IconButton {...args} hierarchy="primary" disabled />
      <IconButton {...args} hierarchy="secondary" disabled />
      <IconButton {...args} hierarchy="ghost" disabled />
    </div>
  ),
};
