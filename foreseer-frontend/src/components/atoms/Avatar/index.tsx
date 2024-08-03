import React from "react";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  size: "small" | "medium" | "large" | "xl";
  glassy?: boolean;
}

export const Avatar = ({ icon, size, glassy, ...props }: AvatarProps) => {
  return (
    <div
      className={`avatar avatar-${size} ${glassy ? "avatar-glassy" : ""}`}
      {...props}
    >
      {icon}
    </div>
  );
};
