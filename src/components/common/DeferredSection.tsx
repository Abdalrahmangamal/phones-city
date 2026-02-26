import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

interface DeferredSectionProps {
  children: ReactNode;
  placeholder?: ReactNode;
  minHeight?: number;
  rootMargin?: string;
  className?: string;
}

export default function DeferredSection({
  children,
  placeholder,
  minHeight = 0,
  rootMargin = "400px 0px",
  className,
}: DeferredSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;

    const node = containerRef.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? (
        children
      ) : (
        placeholder || <div style={{ minHeight }} aria-hidden />
      )}
    </div>
  );
}
