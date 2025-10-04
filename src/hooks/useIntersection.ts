import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (!hasAnimated) setHasAnimated(true);
      } else {
        setIsVisible(false);
      }
    }, { threshold: 0.3, rootMargin: '5px', ...options });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return { elementRef, isVisible };
};