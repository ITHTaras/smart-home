import { useEffect } from "react";

export default function useOutsideTrigger(ref, isActive, setMenuActive) {
  useEffect(() => {
    if (!isActive) return;

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setMenuActive(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isActive, setMenuActive]);
}
