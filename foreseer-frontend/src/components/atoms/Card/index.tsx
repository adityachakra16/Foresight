// Card.tsx
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
  mode?: "bullish" | "bearish" | "neutral" | "fun" | "info" | "" | "dark";
  backdrop?: boolean;
  clickAnimation?: boolean;
}

export default function Card({
  children,
  style,
  disabled = false,
  mode = "",
  backdrop = false,
  clickAnimation = false,
  ...props
}: CardProps) {
  // Determine the mode class
  const modeClass = mode ? `card-${mode}` : "";

  return (
    <div
      className={`card-container ${modeClass}  ${
        disabled ? "card-disabled" : ""
      } ${clickAnimation ? "card-click-animation" : ""}
      ${backdrop ? "card-with-backdrop" : ""}
      `}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
