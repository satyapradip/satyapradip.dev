"use client";

import React, { useEffect, useState } from "react";

/**
 * CursorSpotlight Component
 * 
 * Tracks mouse cursor movement across the viewport to display a vibrant,
 * multi-stop ambient radial spotlight effect. Specially tuned with warm amber,
 * crimson, and secondary teal tones so it remains clearly visible over both
 * light beige backgrounds (#faf8ff) and dark sections.
 */
export function CursorSpotlight() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on coarse pointer / touch devices for performance
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-300 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, rgba(245, 166, 35, 0.28) 0%, rgba(189, 0, 65, 0.14) 35%, rgba(0, 105, 110, 0.08) 65%, transparent 85%)`,
      }}
      aria-hidden="true"
    />
  );
}
