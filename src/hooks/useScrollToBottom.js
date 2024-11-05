import { useRef, useEffect } from "react";
export function useScrollToBottom(value) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current?.scrollHeight;
    }
  }, [value]);

  return ref;
}
