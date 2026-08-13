import React, { useState, useRef, useEffect, useCallback } from "react";
import { type ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from "./Tooltip.module.css";

import { TooltipPosition } from "./TooltipPosition";

interface TooltipProps {
  children: React.ReactElement<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;
  content: ReactNode;
  position?: TooltipPosition;
}

interface Coords {
  top: number;
  left: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = TooltipPosition.TOP,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    let top = 0;
    let left = 0;
    switch (position) {
      case TooltipPosition.TOP:
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left =
          triggerRect.left +
          scrollX +
          (triggerRect.width - tooltipRect.width) / 2;
        break;
      case TooltipPosition.BOTTOM:
        top = triggerRect.bottom + scrollY + 8;
        left =
          triggerRect.left +
          scrollX +
          (triggerRect.width - tooltipRect.width) / 2;
        break;
      case TooltipPosition.LEFT:
        top =
          triggerRect.top +
          scrollY +
          (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left + scrollX - tooltipRect.width - 8;
        break;
      case TooltipPosition.RIGHT:
        top =
          triggerRect.top +
          scrollY +
          (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + scrollX + 8;
        break;
    }
    setCoords({ top, left });
  }, [position]);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);
    }
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [isVisible, updatePosition]);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  const trigger = React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      if (triggerRef.current !== undefined) {
        Object.assign(triggerRef, { current: node });
      }
      const originalRef = (
        children as React.JSX.IntrinsicAttributes & {
          ref?: React.Ref<HTMLElement>;
        }
      ).ref;
      if (typeof originalRef === "function") {
        originalRef(node);
      } else if (
        originalRef &&
        typeof originalRef === "object" &&
        "current" in originalRef
      ) {
        Object.assign(originalRef, { current: node });
      }
    },

    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      children.props.onMouseEnter?.(e);
      handleMouseEnter();
    },

    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      children.props.onMouseLeave?.(e);
      handleMouseLeave();
    },
  });

  const tooltipRoot = document.getElementById("tooltip-root");

  return (
    <>
      {trigger}
      {isVisible &&
        tooltipRoot &&
        createPortal(
          <div
            ref={tooltipRef}
            className={styles.tooltipContainer}
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
          >
            {content}
          </div>,
          tooltipRoot,
        )}
    </>
  );
};
