interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  style?: React.CSSProperties;
  vertical?: boolean;
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  gap?: "small" | "medium" | "large" | number;
  ref?: React.RefObject<HTMLDivElement>;
}

export const Flex = ({
  children,
  style,
  vertical = false,
  justify = "flex-start",
  align = "stretch",
  wrap = "nowrap",
  gap = "medium",
  ref,
  ...props
}: FlexProps) => {
  const gapSize =
    typeof gap === "number"
      ? `${gap}rem`
      : gap === "large"
      ? "2.8rem"
      : gap === "medium"
      ? "1.6rem"
      : "0.8rem";

  return (
    <div
      className={`flex ${vertical ? "flex-col" : "flex-row"}`}
      style={{
        ...style,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        gap: gapSize,
      }}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  );
};
