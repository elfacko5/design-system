import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const options = [
  { value: 'apple', label: 'Apple', description: 'A crisp, sweet fruit' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date', disabled: true },
];

export const Default: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState<string | undefined>();
      return (
        <div style={{ width: 320 }}>
          <Dropdown label="Fruit" options={options} value={value} onChange={setValue} />
        </div>
      );
    }
    return <Demo />;
  },
};

export const ErrorState: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState<string | undefined>();
      return (
        <div style={{ width: 320 }}>
          <Dropdown
            label="Fruit"
            options={options}
            value={value}
            onChange={setValue}
            error
            errorText="Please choose a fruit"
          />
        </div>
      );
    }
    return <Demo />;
  },
};

export const Disabled: Story = {
  render: () => (
    <Dropdown label="Fruit" options={options} value="apple" onChange={() => {}} disabled />
  ),
};
