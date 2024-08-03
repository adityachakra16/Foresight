import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactDOM from "react-dom";

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  disableTrigger?: boolean;
  placement?:
    | "bottom-left"
    | "bottom-right"
    | "bottom"
    | "top"
    | "top-left"
    | "top-right"
    | "left"
    | "right";
  level?: number;
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  isOpen,
  setIsOpen,
  disableTrigger,
  placement = "bottom-left",
  level = 1,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!disableTrigger) setIsOpen(!isOpen);
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen && triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let style: React.CSSProperties = {
        position: "fixed",
        zIndex: 1000 + level,
      };

      // Horizontal positioning
      if (placement.includes("left")) {
        style.left = triggerRect.left;
      } else if (placement.includes("right")) {
        style.left = triggerRect.right - contentRect.width;
      } else {
        style.left =
          triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
      }

      // Adjust if out of bounds
      if (style.left < 0) {
        style.left = 0;
      } else if (style.left + contentRect.width > viewportWidth) {
        style.left = viewportWidth - contentRect.width;
      }

      // Vertical positioning
      if (placement.startsWith("bottom")) {
        style.top = triggerRect.bottom + 5;
        if (style.top + contentRect.height > viewportHeight) {
          style.top = triggerRect.top - contentRect.height - 5;
        }
      } else if (placement.startsWith("top")) {
        style.top = triggerRect.top - contentRect.height - 5;
        if (style.top < 0) {
          style.top = triggerRect.bottom + 5;
        }
      } else {
        style.top =
          triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
      }

      setPopoverStyle(style);
    }
  }, [isOpen, placement, level]);

  return (
    <>
      <div
        className="popover-container"
        ref={triggerRef}
        onClick={handleToggle}
      >
        {trigger}
      </div>
      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={contentRef}
            className="content"
            style={popoverStyle}
            onClick={handleContentClick}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};

export default Popover;
