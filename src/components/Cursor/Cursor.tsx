import { useEffect, useRef, useState, memo } from "react";

const Cursor = () => {
  const [outOfViewport, setOutOfViewport] = useState(false);
  const [isTouchscreen, setIsTouchscreen] = useState(false);
  const dotRef = useRef<HTMLImageElement>(null);
  const point = useRef({ x: 0, y: 0 });
  const dirty = useRef(false);

  useEffect(() => {}, [outOfViewport]);
  useEffect(() => {}, [isTouchscreen]);

  useEffect(() => {
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      point.current.x = e.pageX;
      point.current.y = e.pageY;
      dirty.current = true;
      checkIfTouchscreen();
    };

    const tick = () => {
      if (dirty.current && dotRef.current) {
        dotRef.current.style.transform = `translate3d(${point.current.x}px, ${point.current.y}px, 0)`;
        dirty.current = false;
      }
      raf = requestAnimationFrame(tick);
    };

    const checkIfTouchscreen = () => {
      if (window.matchMedia("(pointer: coarse)").matches) {
        setIsTouchscreen(true);
      } else {
        setIsTouchscreen(false);
      }
    };

    checkIfTouchscreen();

    const handleChange = (val: boolean) => {
      setOutOfViewport(val);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", () => handleChange(true));
    document.addEventListener("mouseenter", () => handleChange(false));
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", () => handleChange(true));
      document.removeEventListener("mouseenter", () => handleChange(false));
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <img
      ref={dotRef}
      src="/images/cursor.svg"
      alt=""
      className={`${
        outOfViewport || isTouchscreen ? "hidden" : "fixed"
      } top-0 left-0 w-4 pointer-events-none will-change-transform z-[9999]`}
      style={{ transform: "translate3d(-50%, -50%, 0)" }}
    />
  );
};

export default memo(Cursor);
