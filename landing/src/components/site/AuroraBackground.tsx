"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[100dvh] flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300 text-slate-950 dark:text-slate-50",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "pointer-events-none absolute -inset-[10px] opacity-50 blur-[100px]",
            showRadialGradient &&
              "[background-image:radial-gradient(circle_at_50%_50%,_rgba(120,119,198,0.3),_transparent_70%)]"
          )}
        />
        <div className="absolute top-0 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-300/20 blur-[100px]" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
