import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <TextField label="Header title" detail="Detail" placeholder="Value" helperText="Footer" />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <TextField label="Header title" defaultValue="Value" />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <TextField
        label="Header title"
        defaultValue="Value"
        error
        errorText="This field is required"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <TextField label="Header title" defaultValue="Value" disabled />
    </div>
  ),
};
