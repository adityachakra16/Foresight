import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  children: React.ReactNode;
}

const FullScreenModal = ({
  isOpen,
  onClose,
  showCloseButton = true,
  children,
}: ModalProps) => {
  const [visible, setVisible] = useState(isOpen);
  const [animationClass, setAnimationClass] = useState("modalWindowEnter");

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setAnimationClass("modalWindowEnter");
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setAnimationClass("modalWindowExit");
    // Wait for the animation to finish before closing the modal
    setTimeout(() => {
      setVisible(false);
      onClose(); // call the onClose handler
    }, 300); // This timeout duration should match the animation duration
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add event listener for the Esc key
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]); // Only re-run if onClose changes

  if (!visible) return null;

  return (
    <div className={`modalWindow ${animationClass}`}>
      <div className={`modal-content`} onClick={(e) => e.stopPropagation()}>
        {showCloseButton && (
          <button className="closeButton" onClick={handleClose}>
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default FullScreenModal;
