import React from 'react';
import { useNavigate } from 'react-router-dom';

const Alert = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); // Navigate to the home page
    if (onClose) onClose(); // Call onClose if provided
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-semibold text-gray-800">Order Confirmed</h2>
        <p className="mt-2 text-gray-600">{message}</p>
        <button
          onClick={handleClick}
          className="mt-4 inline-flex items-center justify-center rounded bg-teal-600 py-2 px-4 text-base font-semibold text-white transition hover:bg-teal-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Alert;
