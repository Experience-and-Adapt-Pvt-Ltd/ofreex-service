"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  data?: any;
  body: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  disabled,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <IoMdClose size={24} />
          </button>
          <div className="flex justify-center mb-4">
            {/* Replace with your logo or icon */}
            <img
              src="images/logo-version-two.png"
              alt="Logo"
              className="h-12"
            />
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
          <form>
            <div className="mb-4">{body}</div>
            <div className="flex items-center justify-center my-4">
            </div>
            {footer}
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
