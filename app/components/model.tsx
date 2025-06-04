"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: React.ReactNode;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ header, isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center px-4 pt-20">
      <div className="bg-[#444444a9] backdrop-blur-md rounded-xl h-fit max-w-[600px] w-full p-6 relative shadow-lg animate-fadeIn">
        <div className="flex justify-between items-center">
          {header}
          <button onClick={onClose} className="w-12 h-12 rounded-full bg-[#ffffff1f] hover:bg-[#ffffff6d] text-white text-4xl font-normal flex justify-center items-center">
            ×
          </button>
        </div>
        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
