// Tag.tsx
import React from "react";

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  selected?: boolean;
}

// Tag component
const Tag = ({ children, ...props }: TagProps) => {
  return (
    <div
      className="tag-container"
      {...props}
      style={{
        cursor: props.onClick ? "pointer" : "default",
        borderColor: props.selected ? "#F9FAFB" : "rgba(97, 96, 97, 0.3)",
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};

export default Tag;
