import * as React from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '../lib/cn';

const TooltipPortal = TooltipPrimitive.Portal;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipProvider = ({
  delayDuration = 300,
  skipDelayDuration = 0,
  children,
  ...props
}: {
  delayDuration?: number;
  skipDelayDuration?: number;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) => (
  <TooltipPrimitive.Provider
    delayDuration={delayDuration}
    skipDelayDuration={skipDelayDuration}
    {...props}
  >
    {children}
  </TooltipPrimitive.Provider>
);
TooltipProvider.displayName = TooltipPrimitive.Provider.displayName;

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow> & {
    variant: 'bubble' | 'extract';
  }
>(({ className, variant, width = 14, height = 7, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    width={width}
    height={height}
    className={cn(
      variant === 'extract' ? 'fill-purple' : 'fill-blue-select',
      className,
    )}
    {...props}
  />
));
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    variant?: 'default' | 'bubble' | 'extract';
    size?: 'sm' | 'md' | 'lg';
  }
>(
  (
    { className, variant = 'default', size = 'md', sideOffset = 4, ...props },
    ref,
  ) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 rounded-md border bg-popover p-2 text-sm text-dark shadow-tooltip animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        variant !== 'default' &&
          'border-none text-center text-white !shadow-none',
        variant === 'bubble' && 'bg-blue-select',
        variant === 'extract' && 'bg-purple',
        size === 'sm' && 'px-3 py-1.5',
        size === 'lg' && 'px-3 py-2.5',
        size !== 'md' && 'rounded',
        className,
      )}
      {...props}
    />
  ),
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipPortal,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
};
