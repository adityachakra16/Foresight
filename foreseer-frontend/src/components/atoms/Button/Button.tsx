import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  type?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "transparent"
    | "outlined"
    | "buy"
    | "sell";
  shape?: "circle" | "normal";
  size?: "small" | "medium" | "large";
  bordered?: boolean;
  sparkle?: boolean;
  loading?: boolean;
  disabled?: boolean;
  disableAnimation?: boolean;
  underlineOnHover?: boolean;
}

const Button = ({
  children,
  size = "medium",
  shape = "normal",
  type = "primary",
  icon,
  onClick,
  loading,
  disableAnimation,
  underlineOnHover,
  ...props
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLSpanElement>(null);

  const buttonClasses = `button button-${size} button-${shape} button-${type} ${
    loading ? "button-loading" : ""
  } ${disableAnimation ? "button-animation-disabled" : ""} 
  }`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span ref={contentRef} className="button-content">
        {icon && <span className="icon-container">{icon}</span>}
        {children}{" "}
      </span>
      {loading && <span className="loader"></span>}
      {type === "primary" && !loading && !disableAnimation && (
        <span className={`arrow-container ${isHovered ? "show-arrow" : ""}`}>
          <FaArrowRight />
        </span>
      )}
      {underlineOnHover && isHovered && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current" />
      )}
    </button>
  );
};
export default Button;
