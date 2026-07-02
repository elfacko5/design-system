import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Input: Story = {
  render: () => <Chip type="input">Tag name</Chip>,
};

export const Filter: Story = {
  render: () => {
    function FilterDemo() {
      const [selected, setSelected] = useState(false);
      return (
        <Chip type="filter" selected={selected} onClick={() => setSelected((s) => !s)}>
          Filter option
        </Chip>
      );
    }
    return <FilterDemo />;
  },
};

export const FilterWithIcon: Story = {
  render: () => (
    <Chip
      type="filter"
      icon={
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 10c2-4 5-6 7-6s5 2 7 6c-2 4-5 6-7 6s-5-2-7-6z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      }
    >
      Filter chip
    </Chip>
  ),
};

export const Action: Story = {
  render: () => <Chip type="action">Add filter</Chip>,
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Chip type="filter" disabled>
        Disabled
      </Chip>
      <Chip type="action" disabled>
        Disabled
      </Chip>
    </div>
  ),
};
