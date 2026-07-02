import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [expanded, setExpanded] = useState(false);
      return (
        <div style={{ width: 343 }}>
          <Accordion title="Title" subtitle="Subtitle 1" expanded={expanded} onToggle={setExpanded}>
            Content goes here.
          </Accordion>
        </div>
      );
    }
    return <Demo />;
  },
};

export const NoContentPadding: Story = {
  render: () => {
    function Demo() {
      const [expanded, setExpanded] = useState(true);
      return (
        <div style={{ width: 343 }}>
          <Accordion title="Title" expanded={expanded} onToggle={setExpanded} contentPadding="none">
            <img
              src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='343' height='120'%3E%3Crect width='343' height='120' fill='%23e5e7eb'/%3E%3C/svg%3E"
              alt=""
              style={{ display: 'block', width: '100%' }}
            />
          </Accordion>
        </div>
      );
    }
    return <Demo />;
  },
};
