"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value?: string;
  target?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  className?: string;
}

/**
 * AnimatedCounter Component
 * 
 * Smoothly animates a numeric counter from 0 to target when scrolled into view.
 * Robustly supports string values (e.g. "350+", "9.29", "10K+") as well as numeric targets with prefix/suffix.
 */
export function AnimatedCounter({
  value,
  target,
  prefix = "",
  suffix = "",
  label,
  className,
}: AnimatedCounterProps) {
  // Safely derive full string representation to avoid undefined access
  const strVal = value ?? `${prefix}${target ?? 0}${suffix}`;

  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Safely extract numeric value and symbols
    const safeStr = strVal || "0";
    const numericPart = target ?? (parseFloat(safeStr.replace(/[^0-9.]/g, "")) || 0);
    const parsedPrefix = prefix || (safeStr.match(/^[^\d]*/)?.[0] || "");
    const parsedSuffix = suffix || (safeStr.match(/[^\d.]*$/)?.[0] || "");
    const isDecimal = safeStr.includes(".");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const startTime = performance.now();

          const updateCount = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const currentNum = numericPart * easeProgress;
            const formatted = isDecimal
              ? currentNum.toFixed(2)
              : Math.floor(currentNum).toString();

            setDisplayValue(`${parsedPrefix}${formatted}${parsedSuffix}`);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              setDisplayValue(safeStr);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, target, prefix, suffix, strVal]);

  return (
    <div ref={ref} className={cn("inline-flex flex-col items-center justify-center", className)}>
      <span className="font-display font-bold tracking-tight">
        {displayValue}
      </span>
      {label && (
        <span className="text-xs sm:text-sm font-medium text-secondary mt-1 tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
}
