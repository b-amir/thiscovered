import { useState, useCallback, useRef } from "react";

interface Position {
  x: number;
  y: number;
}

export const useDrag = () => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [initialClick, setInitialClick] = useState<Position>({ x: 0, y: 0 });
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setDragging(true);
      setInitialClick({ x: e.clientX - position.x, y: e.clientY - position.y });
    },
    [setPosition, setDragging, position]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, [setDragging]);
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging) {
        setPosition({
          x: e.clientX - initialClick.x,
          y: e.clientY - initialClick.y
        });
      }
    },
    [dragging, setPosition, initialClick]
  );
  const [zoom, setZoom] = useState(1);
  const handleScroll = useCallback(
    (e: React.WheelEvent) => {
      // e.preventDefault();

      const newZoom = zoom + (e.deltaY > 0 ? -0.1 : 0.1);
      setZoom(Math.max(1, newZoom));
    },
    [zoom, setZoom]
  );
  const enableScroll = () => {
    document.removeEventListener("wheel", preventDefault, false);
  };

  const disableScroll = () => {
    document.addEventListener("wheel", preventDefault, {
      passive: false
    });
  };

  function preventDefault(e: any) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  }
  const touchPoint1 = useRef<Touch | null>(null);
  const touchPoint2 = useRef<Touch | null>(null);
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        touchPoint1.current = e.touches[0];
        setInitialClick({
          x: touchPoint1.current.clientX - position.x,
          y: touchPoint1.current.clientY - position.y
        });
      } else if (e.touches.length === 2) {
        touchPoint1.current = e.touches[0];
        touchPoint2.current = e.touches[1];
      }
    },
    [position, setInitialClick]
  );
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1 && touchPoint1.current) {
        const touch = e.touches[0];
        setPosition({
          x: touch.clientX - initialClick.x,
          y: touch.clientY - initialClick.y
        });
      } else if (
        e.touches.length === 2 &&
        touchPoint1.current &&
        touchPoint2.current
      ) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const initialDistance = Math.hypot(
          touchPoint2.current.clientX - touchPoint1.current.clientX,
          touchPoint2.current.clientY - touchPoint1.current.clientY
        );
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        const newZoom = (currentDistance / initialDistance) * zoom;
        setZoom(Math.max(1, newZoom));
      }
    },
    [initialClick, setPosition, setZoom, zoom]
  );

  return {
    position,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    zoom,
    handleScroll,
    enableScroll,
    disableScroll,
    handleTouchStart,
    handleTouchMove
  };
};
