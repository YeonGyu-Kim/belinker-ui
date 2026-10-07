import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../src';

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 3.5v9M3.5 8h9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: '버튼',
    buttonType: 'default',
    variant: 'primary',
    size: 'md',
    disabled: false,
    tooltipContent: '',
    tooltipSide: 'top',
    tooltipAlign: 'center',
  },
  argTypes: {
    buttonType: {
      control: 'select',
      options: ['default', 'icon', 'text'],
      description: '버튼 종류. variant와 size 목록이 종류마다 다릅니다.',
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'extract',
        'destructive',
        'landing',
        'access',
        'inactive',
        'point',
        'date',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'landing'],
      description: '크기를 바꾸면 높이와 글자 크기가 바로 반영됩니다.',
    },
    tooltipContent: {
      control: 'text',
      description: '값을 넣으면 호버 시 툴팁이 나타납니다.',
    },
    tooltipSide: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    tooltipAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    disabled: { control: 'boolean' },
    asChild: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Default: Story = {
  args: {
    buttonType: 'default',
    variant: 'primary',
    size: 'md',
    children: '저장',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'extract',
        'destructive',
        'landing',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'landing'],
    },
  },
};

export const Icon: Story = {
  args: {
    buttonType: 'icon',
    variant: 'primary',
    size: 'lg',
    'aria-label': '추가',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'access',
        'inactive',
        'point',
        'accent',
        'date',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    children: { control: false },
  },
  render: (args) => (
    <Button {...args}>
      <PlusIcon />
    </Button>
  ),
};

export const Text: Story = {
  args: {
    buttonType: 'text',
    variant: 'ghost',
    size: 'sm',
    children: '더보기',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export const WithTooltip: Story = {
  args: {
    children: '마우스를 올려 보세요',
    tooltipContent: '도면을 저장합니다',
    tooltipSide: 'top',
  },
};
