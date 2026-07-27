import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-3",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {subtitle && (
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-dark">
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          "font-heading text-3xl md:text-4xl font-semibold text-primary tracking-tight",
          titleClassName
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "h-0.5 w-12 rounded-full bg-accent mt-1",
          centered ? "mx-auto" : "mr-auto"
        )}
      />
    </div>
  );
}
