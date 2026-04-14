import { useEffect, useState, useRef } from 'react';

export function useScrollSpy(sectionIds: string[], headerHeight = 76) {
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `-${headerHeight}px 0px -60% 0px`, threshold: 0 }
    );

    elements.forEach(el => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, [sectionIds, headerHeight]);

  return activeId;
}
