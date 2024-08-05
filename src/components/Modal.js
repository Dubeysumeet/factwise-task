import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <div className="flex justify-between items-center mb-8 mt-1">
          <div className="text-left">
            {children}
          </div>
          <button onClick={onClose} className="text-lg text-gray-500 mb-4">
            <FaTimes />
          </button>
        </div>
        <div className="flex justify-end mt-4">
        <button 
            onClick={onClose} 
            className="border text-black px-6 py-2 rounded-xl"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="bg-red-500 text-white px-6 py-2 rounded-xl ml-2"
          >
            Delete
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Modal;
