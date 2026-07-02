import type { Meta, StoryObj } from '@storybook/react';
import { TabBarItem } from './TabBarItem';

const meta: Meta<typeof TabBarItem> = {
  title: 'Components/TabBarItem',
  component: TabBarItem,
};

export default meta;
type Story = StoryObj<typeof TabBarItem>;

export const Selected: Story = {
  args: { label: 'Label', selected: true },
};

export const Unselected: Story = {
  args: { label: 'Label' },
};
