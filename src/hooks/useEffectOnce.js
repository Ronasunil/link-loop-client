import { useRef, useEffect } from "react";

export function useEffectOnce(callback) {
  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      callback();
      ref.current = true;
    }
  }, [callback]);
}
