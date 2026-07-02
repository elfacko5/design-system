import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'lgPlus', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

function Placeholder() {
  return (
    <div
      style={{
        background: '#dbeafe',
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      slot
    </div>
  );
}

export const Playground: Story = {
  args: { padding: 'md' },
  render: (args) => (
    <div style={{ width: 343 }}>
      <Container {...args}>
        <Placeholder />
      </Container>
    </div>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <div style={{ width: 343 }}>
      <Container padding="md" header="Section title" footer="Footer">
        <Placeholder />
      </Container>
    </div>
  ),
};

export const AllPaddingSteps: Story = {
  render: () => (
    <div style={{ width: 343, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['none', 'xs', 'sm', 'md', 'lg', 'lgPlus', 'xl'] as const).map((padding) => (
        <Container key={padding} padding={padding} header={`Padding: ${padding}`}>
          <Placeholder />
        </Container>
      ))}
    </div>
  ),
};
