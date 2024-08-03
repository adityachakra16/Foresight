// Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  endcomponent?: React.ReactNode;
  containerstyle?: React.CSSProperties;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ endcomponent, ...props }, ref) => {
    return (
      <div
        className="input-container non-draggable"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          ...props.containerstyle,
        }}
      >
        <input className="styled-input" ref={ref} {...props} />
        {endcomponent && <div className="endcomponent">{endcomponent}</div>}
      </div>
    );
  }
) as React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
>;

// Set display name for the component
Input.displayName = "Input";

export default Input;
