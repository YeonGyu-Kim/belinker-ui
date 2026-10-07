import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/cn';

import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip';

const defaultButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-select text-white hover:bg-blue-hover border border-blue-select',
        secondary: 'bg-white text-dark hover:bg-gray-bg border',
        accent: 'bg-white text-blue-select hover:bg-gray-bg border',
        extract: 'bg-white text-purple hover:bg-purple-bg border',
        destructive:
          'bg-destructive text-white hover:bg-destructive-hover border border-destructive',
        landing: 'bg-blue hover:bg-landing-blue-hover text-white',
      },
      size: {
        xs: 'h-5 px-1 py-0 gap-0.5 rounded-sm text-sm',
        sm: 'h-7 px-1.5 py-1 gap-1 rounded-md text-sm',
        md: 'h-8 px-2 py-1.5 gap-1 rounded-md text-sm min-w-[50px]',
        lg: 'h-[38px] px-3 py-2 gap-1.5 rounded text-sm',
        xl: 'h-[46px] px-6 py-2.5 gap-1.5 rounded text-md',
        landing: 'font-semibold text-md rounded-[8px] underDesktop:text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

const iconButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap shrink-0 font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary: 'bg-white text-dark hover:bg-gray-bg border',
        secondary: 'bg-white text-dark hover:bg-gray-bg',
        access:
          'bg-white text-blue-select hover:bg-blue-extralight border border-blue-clicked',
        inactive:
          'bg-white text-gray-icon hover:bg-gray-bg border border-gray-hover',
        point: 'bg-white text-blue-select hover:bg-blue-extralight',
        accent: 'bg-inherit text-dark hover:bg-gray-hover',
        date: 'bg-white text-dark hover:bg-gray-bg',
      },
      size: {
        xs: 'h-5 w-5 p-0 gap-0 rounded-sm',
        sm: 'h-6 w-6 p-0.5 gap-0.5 rounded-sm',
        md: 'h-7 w-7 p-1 gap-1 rounded-sm',
        lg: 'h-8 w-8 p-1.5 gap-1.5 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  },
);

const textButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        ghost: 'text-blue-select bg-inherit',
        link: 'text-gray hover:text-dark disabled:opacity-40',
      },
      size: {
        sm: 'h-5 gap-1.5 text-sm leading-[1.4]',
        md: 'h-[26px] gap-1.5 text-md',
        lg: 'h-[26px] gap-1.5 text-xl leading-[1.4]',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'sm',
    },
  },
);

const buttonVariants = {
  default: defaultButtonVariants,
  icon: iconButtonVariants,
  text: textButtonVariants,
} as const;

type ButtonType = keyof typeof buttonVariants;

type ButtonVariantProps<T extends ButtonType> = VariantProps<
  (typeof buttonVariants)[T]
>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType;
  variant?:
    | ButtonVariantProps<'default'>['variant']
    | ButtonVariantProps<'icon'>['variant']
    | ButtonVariantProps<'text'>['variant'];
  size?:
    | ButtonVariantProps<'default'>['size']
    | ButtonVariantProps<'icon'>['size']
    | ButtonVariantProps<'text'>['size'];
  asChild?: boolean;
  tooltipContent?: string;
  tooltipAlign?: 'start' | 'center' | 'end';
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right';
  tooltipClassName?: string;
  tooltipArrowClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      buttonType = 'default',
      variant,
      size,
      asChild = false,
      tooltipContent = '',
      tooltipAlign = 'center',
      tooltipSide = 'top',
      tooltipClassName,
      tooltipArrowClassName,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    const variantFn = buttonVariants[buttonType];
    const buttonClassName = variantFn({
      variant: variant as never,
      size: size as never,
      className,
    });

    const button = (
      <Comp className={cn(buttonClassName)} ref={ref} {...props} />
    );

    if (!tooltipContent) {
      return button;
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipPortal>
            <TooltipContent
              side={tooltipSide}
              align={tooltipAlign}
              variant="bubble"
              size="sm"
              className={cn('z-[101] max-w-[159px]', tooltipClassName)}
            >
              {tooltipContent}
              <TooltipArrow
                variant="bubble"
                className={cn(tooltipArrowClassName)}
              />
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </TooltipProvider>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
