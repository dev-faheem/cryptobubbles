"use client";

import { useEffect, useState } from "react";

export function useIsSmallDevice(threshold: number = 1300): boolean {
  const [isSmall, setIsSmall] = useState(() => (typeof window !== "undefined" ? window.innerWidth < threshold : false));

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < threshold);
    };

    window.addEventListener("resize", handleResize);
    // Set initial size in case of late mount
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [threshold]);

  return isSmall;
}
