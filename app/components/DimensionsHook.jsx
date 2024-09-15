"use client";
import { useEffect, useState } from "react";

function getWindowWidth() {
  const width = 0;
  return width;
}

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}
