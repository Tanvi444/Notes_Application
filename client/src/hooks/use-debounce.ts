import { useEffect, useState } from "react";

export const useDebounce = <T = unknown>(value: T, delay: number = 500): T => {
  const [debouncedQuery, setDebouncedQuery] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(value);
      clearTimeout(timeoutId);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, value]);

  return debouncedQuery;
};
