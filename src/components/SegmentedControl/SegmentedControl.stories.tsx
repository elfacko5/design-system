import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const ThreeSegments: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState('day');
      return (
        <div style={{ width: 300 }}>
          <SegmentedControl
            aria-label="Time range"
            value={value}
            onChange={setValue}
            options={[
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
            ]}
          />
        </div>
      );
    }
    return <Demo />;
  },
};

export const FiveSegments: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState('b');
      return (
        <div style={{ width: 400 }}>
          <SegmentedControl
            aria-label="Options"
            value={value}
            onChange={setValue}
            options={[
              { value: 'a', label: 'A' },
              { value: 'b', label: 'B' },
              { value: 'c', label: 'C' },
              { value: 'd', label: 'D' },
              { value: 'e', label: 'E' },
            ]}
          />
        </div>
      );
    }
    return <Demo />;
  },
};
