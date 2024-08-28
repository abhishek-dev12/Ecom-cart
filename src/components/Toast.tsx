import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface ToastProps {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation to complete
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
    info: <InformationCircleIcon className="w-5 h-5 text-blue-500" />,
    warning: <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />,
    error: <XCircleIcon className="w-5 h-5 text-red-500" />,
  };

  const bgColors = {
    success: 'bg-green-100',
    info: 'bg-blue-100',
    warning: 'bg-yellow-100',
    error: 'bg-red-100',
  };

  return (
    <div 
      className={`
        w-screen
        fixed bottom-10 left-1/2 transform -translate-x-1/2 ${bgColors[type]} border-l-4 border-${type === 'info' ? 'blue' : type}-500 
        rounded-md p-4 shadow-md transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
    >
      <div className="flex gap-2 items-center">
        {icons[type]}
        <p className="ml-3 text-sm font-medium text-gray-900">{message}</p>
        <button onClick={() => setIsVisible(false)} className="ml-auto text-gray-400 hover:text-gray-900">
          <XCircleIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;