import { useState, useEffect } from "react";

export default function useOutsideClick(ref, initialState) {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const onClick = function (e) {
      if (ref.current && !ref.current.contains(e.target))
        setIsOpen((state) => !state);
    };

    if (isOpen) window.addEventListener("mousedown", onClick);

    return () => window.removeEventListener("mousedown", onClick);
  }, [ref]);

  return [isOpen, setIsOpen, ref];
}
