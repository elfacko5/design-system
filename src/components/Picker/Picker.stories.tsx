import type { Meta, StoryObj } from '@storybook/react';
import { Picker } from './Picker';

const meta: Meta<typeof Picker> = {
  title: 'Components/Picker',
  component: Picker,
};

export default meta;
type Story = StoryObj<typeof Picker>;

export const Default: Story = {
  args: { date: 'Apr 1, 2025', time: '9:41 AM', onDateClick: () => {}, onTimeClick: () => {} },
};

export const Selected: Story = {
  args: {
    date: 'Apr 1, 2025',
    time: '9:41 AM',
    selected: true,
    onDateClick: () => {},
    onTimeClick: () => {},
  },
};

export const DateOnly: Story = {
  args: { date: 'Apr 1, 2025', onDateClick: () => {} },
};

export const TimeOnly: Story = {
  args: { time: '9:41 AM', onTimeClick: () => {} },
};

export const NoHandlers: Story = {
  name: 'Without click handlers (disabled)',
  args: { date: 'Apr 1, 2025', time: '9:41 AM' },
};
