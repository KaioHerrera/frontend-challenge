import Modal from './Modal';
import './Modal.css';

export default function EditModal({
  isOpen,
  onClose,
  title,
  content,
  setTitle,
  setContent,
  onSave,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className='modal-title'>Edit item</h3>

      <label className='modal-label'>Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='modal-input'
      />

      <label className='modal-label'>Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className='modal-textarea'
        rows={4}
      />

      <div className='modal-actions'>
        <button className='modal-button edit-cancel' onClick={onClose}>
          Cancel
        </button>
        <button
          className='modal-button save'
          onClick={onSave}
          disabled={!title.trim() || !content.trim()}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
