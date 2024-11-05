import { useEffect, useState } from "react";

export function useDebounce(query, time = 1000) {
  const [debounceValue, setDebounceValue] = useState(query);
  useEffect(() => {
    const timer = setTimeout(function () {
      setDebounceValue(query);
    }, time);

    return () => clearTimeout(timer);
  }, [query, time]);

  return debounceValue;
}
