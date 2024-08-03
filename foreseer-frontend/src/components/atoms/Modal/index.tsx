import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  children: React.ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  showCloseButton = true,
  children,
}: ModalProps) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!visible) return null;

  const modalContent = (
    <div className={`modalOverlay ${isOpen ? "modalOpen" : "modalClosed"}`}>
      <div className={"modalBackdrop"} onClick={onClose} />
      <div className={"modalContainer"}>
        <div className={"modalContent"}>
          {showCloseButton && (
            <button className={"smallModalCloseButton"} onClick={onClose}>
              &times;
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
