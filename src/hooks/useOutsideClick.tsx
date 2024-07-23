import { useCallback, useEffect } from "react";

const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
};

export default useOutsideClick;
