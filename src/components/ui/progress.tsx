import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import heart from "@/assets/heart.svg";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-2 w-full rounded-full bg-primary/20", className)}
    {...props}
  >
    <div className="absolute w-full h-full rounded-full overflow-hidden">
      <ProgressPrimitive.Indicator
        className="h-full w-full bg-pink-400 flex-1 bg-primary transition-all relative"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
    <div className="absolute w-full h-full">
      <div
        className="relative h-full w-full flex-1 bg-transparent transition-all relative"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      >
        <div
          className="absolute w-8 h-8 flex items-center justify-center text-xs text-white right-0"
          style={{ transform: `translate(50%, -40%)` }}
        >
          <div className="relative w-7 h-7">
            <img src={heart} className="w-full h-full" />
            <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
              {Math.round(((value || 0) * 30) / 100)}
            </span>
          </div>
        </div>
      </div>
    </div>
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
