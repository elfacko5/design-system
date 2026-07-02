import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  argTypes: {
    checked: { control: false },
    onCheckedChange: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Interactive: Story = {
  args: { 'aria-label': 'Enable notifications' },
  render: function Render(args) {
    const [checked, setChecked] = useState(false);
    return <Toggle {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const On: Story = {
  args: { checked: true, onCheckedChange: () => {}, 'aria-label': 'Enable notifications' },
};

export const Off: Story = {
  args: { checked: false, onCheckedChange: () => {}, 'aria-label': 'Enable notifications' },
};

export const Disabled: Story = {
  args: {
    checked: false,
    onCheckedChange: () => {},
    disabled: true,
    'aria-label': 'Enable notifications',
  },
};
