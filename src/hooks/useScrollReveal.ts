import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.classList.add('opacity-0', 'translate-y-8');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.remove('opacity-0', 'translate-y-8');
          node.classList.add('opacity-100', 'translate-y-0');
        } else {
          node.classList.add('opacity-0', 'translate-y-8');
          node.classList.remove('opacity-100', 'translate-y-0');
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return ref;
}
