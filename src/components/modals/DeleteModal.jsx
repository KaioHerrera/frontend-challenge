import Modal from './Modal';
import './Modal.css';

export default function DeleteModal({ isOpen, onClose, onDelete }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className='modal-title delete'>
        Are you sure you want to delete this item?
      </h3>

      <div className='modal-actions'>
        <button className='modal-button cancel' onClick={onClose}>
          Cancel
        </button>
        <button className='modal-button delete' onClick={onDelete}>
          Delete
        </button>
      </div>
    </Modal>
  );
}
