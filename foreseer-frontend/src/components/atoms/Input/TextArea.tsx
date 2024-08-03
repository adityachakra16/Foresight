import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string; // Made optional since it's already optional in HTMLTextareaAttributes
  endcomponent?: React.ReactNode;
  containerstyle?: React.CSSProperties;
}

// Update the component to use forwardRef
const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ ...props }, ref) => {
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const target = e.target;
      target.style.height = "inherit"; // Reset height to recalculate
      // Ensure the target's scrollHeight is not greater than the max height defined in CSS
      target.style.height = `${Math.min(target.scrollHeight, 320)}px`; // Adjust this value to match your CSS max-height + padding
    };

    return (
      <div
        className="input-container non-draggable"
        style={props.containerstyle}
      >
        <textarea
          ref={ref} // Pass the ref to the textarea
          className="styled-textarea"
          onInput={handleInput} // Add the onInput event handler
          {...props} // Spread the rest of the props
          rows={1}
        />
        <div className="endicon-container">{props.endcomponent}</div>
      </div>
    );
  }
) as React.ForwardRefExoticComponent<
  TextAreaProps & React.RefAttributes<HTMLInputElement>
>;

// Optional: Set a displayName for the component for debugging purposes
TextArea.displayName = "TextArea";

export default TextArea;
