// StreamingText.tsx
import { inter } from "@/pages/_app";
import React, { useEffect, useState } from "react";

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  streamSize?: number;
  streamDelay?: number;
  onStreamEnd?: () => void;
}

const StreamingText: React.FC<TextProps> = ({
  children,
  streamSize = 50,
  streamDelay = 100,
  onStreamEnd,
  ...props
}: TextProps) => {
  // Remove inline styles and use className instead
  const [typedMessages, setTypedMessages] = useState<string[]>([]);
  const [groupedMessages, setGroupedMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const message = children as string;
    setGroupedMessages(
      message.match(new RegExp(`.{1,${streamSize}}`, "g")) || []
    );
    setCurrentIndex(0); // Reset index for new message
    setTypedMessages([]); // Reset typed messages for new message
  }, [children]);

  useEffect(() => {
    if (currentIndex < groupedMessages.length) {
      const timer = setTimeout(() => {
        setTypedMessages((typed) => [...typed, groupedMessages[currentIndex]]);
        setCurrentIndex(currentIndex + 1);
      }, streamDelay);

      return () => clearTimeout(timer);
    } else {
      onStreamEnd && onStreamEnd();
    }
  }, [currentIndex, groupedMessages]);

  return (
    <div
      style={{
        whiteSpace: "pre-wrap",
        color: "#E8E9E7",
        fontSize: "1rem",
        ...props.style,
      }}
      className="text-container"
    >
      {typedMessages.map((msgPart, index) => {
        return (
          <span
            key={index}
            dangerouslySetInnerHTML={{
              __html: msgPart || "",
            }}
            style={{
              fontFamily: inter.style.fontFamily,
              ...props.style,
            }}
            className={`fadeIn`}
          ></span>
        );
      })}
    </div>
  );
};

export default StreamingText;
