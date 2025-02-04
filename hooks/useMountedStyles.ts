import { useState, useEffect } from 'react';

export function useMountedStyles() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    opacity: isMounted ? 1 : 0,
    visibility: isMounted ? 'visible' : 'hidden',
    transition: 'opacity 0.2s ease-in-out'
  } as const;
}