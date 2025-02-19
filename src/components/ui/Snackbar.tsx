import { useState, useEffect } from "react";

interface SnackbarProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-8 px-4 text-sm py-2 rounded shadow-lg text-stone-100 transition-all duration-300 transform ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } bg-black`}
    >
      {message}
    </div>
  );
};

export default Snackbar;
