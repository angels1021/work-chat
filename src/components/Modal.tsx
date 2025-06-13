import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaXmark } from 'react-icons/fa6';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string; // For custom styling on the modal content
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={`modal-overlay fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className={`bg-gray-950 text-gray-400 max-h-[90vh] flex flex-col p-8 rounded-lg shadow-2xl relative max-w-lg w-full transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'} ${className || ''}`}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-pink-600 text-3xl cursor-pointer leading-none"
          onClick={onClose}
          aria-label="Close"
        >
          <FaXmark />
        </button>
        {title && <h2 className="text-2xl font-bold mb-4 border-b pb-2">{title}</h2>}
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>,
    document.body
  );
};
