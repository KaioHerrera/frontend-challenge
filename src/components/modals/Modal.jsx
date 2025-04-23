import './Modal.css';

export default function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-container' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
