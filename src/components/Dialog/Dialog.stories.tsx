import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { Button } from '../Button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Centered: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(true);
      const [dontShow, setDontShow] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open dialog</Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            align="centered"
            title="Placeholder"
            description="A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made."
            primaryAction={{ label: "I'm a button", onClick: () => setOpen(false) }}
            secondaryAction={{ label: "I'm a button", onClick: () => setOpen(false) }}
            dontShowAgain={{ checked: dontShow, onChange: setDontShow }}
          />
        </>
      );
    }
    return <Demo />;
  },
};

export const LeftAligned: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(true);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open dialog</Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            align="left"
            title="Placeholder"
            description="A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made."
            primaryAction={{ label: "I'm a button", onClick: () => setOpen(false) }}
            secondaryAction={{ label: "I'm a button", onClick: () => setOpen(false) }}
          />
        </>
      );
    }
    return <Demo />;
  },
};
