import React, { useState } from "react";

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  text: string | React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  active?: boolean;
}

const Tooltip = ({
  children,
  text,
  placement = "right",
  active = true,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPopoverStyle = (placement: string) => {
    switch (placement) {
      case "bottom-left":
        return { top: "calc(100% + 5px)", left: 0 };
      case "bottom-right":
        return {
          top: "calc(0%)",
          right: 0,
          transform: "translateX(calc(100% + 5px))",
        };
      case "bottom":
        return {
          top: "calc(100% + 5px)",
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "top-left":
        return { bottom: "calc(100% + 5px)", left: 0 };
      case "top-right":
        return { bottom: "calc(100% + 5px)", right: 0 };
      case "top":
        return {
          bottom: "calc(100% + 5px)",
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "left":
        return {
          right: "calc(100% + 5px)",
          top: "50%",
          transform: "translateY(-50%)",
        };
      case "right":
        return {
          left: "calc(100% + 5px)",
          top: "50%",
          transform: "translateY(-50%)",
        };
      default:
        return { top: "calc(100% + 5px)", left: 0 };
    }
  };

  // Determine visibility class
  const visibilityClass = isVisible ? "tooltip-visible" : "";

  if (!active) {
    return <>{children}</>;
  }
  const popoverStyle = getPopoverStyle(placement);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div className={`tooltip-text ${visibilityClass} `} style={popoverStyle}>
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
