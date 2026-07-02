import type { Meta, StoryObj } from '@storybook/react';
import { Fab } from './Fab';

const meta: Meta<typeof Fab> = {
  title: 'Components/Fab',
  component: Fab,
};

export default meta;
type Story = StoryObj<typeof Fab>;

export const IconOnly: Story = {
  args: { 'aria-label': 'Compose' },
};

export const WithLabel: Story = {
  args: { label: 'Label', 'aria-label': 'Compose' },
};

export const Selected: Story = {
  args: { label: 'Label', selected: true, 'aria-label': 'Close' },
};

export const Disabled: Story = {
  args: { label: 'Label', disabled: true, 'aria-label': 'Compose' },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <Fab aria-label="Compose" />
      <Fab label="Label" aria-label="Compose" />
      <Fab selected aria-label="Close" />
      <Fab label="Label" selected aria-label="Close" />
      <Fab disabled aria-label="Compose" />
      <Fab label="Label" disabled aria-label="Compose" />
    </div>
  ),
};
