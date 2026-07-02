import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PaginationDots } from './PaginationDots';

const meta: Meta<typeof PaginationDots> = {
  title: 'Components/PaginationDots',
  component: PaginationDots,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof PaginationDots>;

export const DotsOnly: Story = {
  render: () => {
    function Demo() {
      const [activeIndex, setActiveIndex] = useState(0);
      return <PaginationDots total={6} activeIndex={activeIndex} onChange={setActiveIndex} />;
    }
    return <Demo />;
  },
};

export const WithArrows: Story = {
  render: () => {
    function Demo() {
      const [activeIndex, setActiveIndex] = useState(2);
      return (
        <PaginationDots total={6} activeIndex={activeIndex} onChange={setActiveIndex} showArrows />
      );
    }
    return <Demo />;
  },
};

export const AtStart: Story = {
  render: () => <PaginationDots total={6} activeIndex={0} showArrows />,
};

export const AtEnd: Story = {
  render: () => <PaginationDots total={6} activeIndex={5} showArrows />,
};
