import * as React from 'react';

import {
  TooltipProvider as TooltipProviderPrimitive,
  Tooltip as TooltipPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
  TooltipPositioner as TooltipPositionerPrimitive,
  TooltipPopup as TooltipPopupPrimitive,
  TooltipArrow as TooltipArrowPrimitive,
  TooltipPortal as TooltipPortalPrimitive,
} from '@/components/animate-ui/primitives/base/tooltip';
import { cn } from '@/lib/utils';

function TooltipProvider({
  delay = 0,
  ...props
}) {
  return <TooltipProviderPrimitive delay={delay} {...props} />;
}

function Tooltip({
  delay = 0,
  ...props
}) {
  return (
    <TooltipProvider delay={delay}>
      <TooltipPrimitive {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}) {
  return <TooltipTriggerPrimitive {...props} />;
}

function TooltipPanel({
  className,
  sideOffset = 4,
  children,
  style,
  ...props
}) {
  return (
    <TooltipPortalPrimitive>
      <TooltipPositionerPrimitive sideOffset={sideOffset} className="z-50" {...props}>
        <TooltipPopupPrimitive
          className={cn(
            'bg-primary text-primary-foreground w-fit origin-(--transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
            className
          )}
          style={style}>
          {children}
          <TooltipArrowPrimitive
            className="bg-primary fill-primary z-50 size-2.5 data-[side='bottom']:-top-[4px] data-[side='right']:-left-[4px] data-[side='left']:-right-[4px] data-[side='inline-start']:-right-[4px] data-[side='inline-end']:-left-[4px] rotate-45 rounded-[2px]" />
        </TooltipPopupPrimitive>
      </TooltipPositionerPrimitive>
    </TooltipPortalPrimitive>
  );
}

export { Tooltip, TooltipTrigger, TooltipPanel };
