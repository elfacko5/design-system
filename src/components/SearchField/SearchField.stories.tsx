import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof SearchField>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState('');
      return (
        <div style={{ width: 320 }}>
          <SearchField label="Search" placeholder="Search..." value={value} onChange={setValue} />
        </div>
      );
    }
    return <Demo />;
  },
};

export const Filled: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState('Design tokens');
      return (
        <div style={{ width: 320 }}>
          <SearchField label="Search" value={value} onChange={setValue} />
        </div>
      );
    }
    return <Demo />;
  },
};

export const Error: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState('!!!');
      return (
        <div style={{ width: 320 }}>
          <SearchField
            label="Search"
            value={value}
            onChange={setValue}
            error
            errorText="No results for this query"
          />
        </div>
      );
    }
    return <Demo />;
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <SearchField label="Search" value="Design tokens" disabled />
    </div>
  ),
};
