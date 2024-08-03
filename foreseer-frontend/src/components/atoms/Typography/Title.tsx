// Heading.tsx
import { comfortaa } from "@/pages/_app";
import React, { createElement } from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  level = 1,
  ...props
}: HeadingProps) => {
  const HeadingType = `h${level}`;
  const headingClass = `heading heading-${level}`;

  return createElement(
    HeadingType,
    {
      ...props,
      className: `${props.className || ""} ${headingClass}`.trim(),
      style: {
        fontFamily: comfortaa.style.fontFamily,
        ...props.style,
      },
    },
    children
  );
};

export default Heading;
