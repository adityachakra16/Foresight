// Text.tsx
import { inter } from "@/pages/_app";
import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ children, ...props }: TextProps) => {
  // Remove inline styles and use className instead
  return (
    <div
      className="text"
      {...props}
      style={{
        fontFamily: inter.style.fontFamily,
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};

export default Text;
