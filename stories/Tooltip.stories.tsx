import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from '../src/components/Tooltip';

type TooltipDemoProps = {
  content: string;
  variant: 'default' | 'bubble' | 'extract';
  size: 'sm' | 'md' | 'lg';
  side: 'top' | 'right' | 'bottom' | 'left';
  align: 'start' | 'center' | 'end';
  open: boolean;
};

function TooltipDemo({
  content,
  variant,
  size,
  side,
  align,
  open,
}: TooltipDemoProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open ? true : undefined}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="rounded border bg-white px-3 py-2 text-sm text-dark"
          >
            마우스를 올려 보세요
          </button>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            side={side}
            align={align}
            variant={variant}
            size={size}
          >
            {content}
            {variant !== 'default' ? <TooltipArrow variant={variant} /> : null}
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
}

const meta = {
  title: 'Components/Tooltip',
  component: TooltipDemo,
  tags: ['autodocs'],
  args: {
    content: '도면을 저장합니다',
    variant: 'bubble',
    size: 'md',
    side: 'top',
    align: 'center',
    open: true,
  },
  argTypes: {
    content: {
      control: 'text',
      description: '툴팁에 표시할 문구입니다.',
    },
    variant: {
      control: 'select',
      options: ['default', 'bubble', 'extract'],
      description: 'default는 흰 배경, bubble은 파랑, extract는 보라입니다.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    open: {
      control: 'boolean',
      description: '켜면 호버 없이 바로 보입니다. 끄면 마우스를 올렸을 때만 나타납니다.',
    },
  },
} satisfies Meta<typeof TooltipDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
};

export const Bubble: Story = {
  args: {
    variant: "extract",
    size: 'sm',
  },
};

export const Extract: Story = {
  args: {
    variant: 'extract',
    size: 'lg',
    content: '선택한 영역을 추출합니다',
  },
};
