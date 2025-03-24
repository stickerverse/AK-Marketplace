import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import Button from './Button';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  variant = 'default',
  closeOnEsc = true,
  closeOnBackdrop = true,
  showCloseButton = true
}) => {
  const modalRef = useRef(null);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore body scroll when modal is closed
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, closeOnEsc]);

  // Handle click outside the modal
  const handleBackdropClick = (event) => {
    if (closeOnBackdrop && modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // Get modal container class based on size
  const getModalContainerClass = () => {
    let className = 'modal-container';
    
    switch (size) {
      case 'sm':
        className += ' max-w-md';
        break;
      case 'lg':
        className += ' max-w-3xl';
        break;
      case 'xl':
        className += ' max-w-5xl';
        break;
      case 'full':
        className += ' max-w-full mx-4';
        break;
      case 'md':
      default:
        className += ' max-w-2xl';
        break;
    }
    
    // Add glass effect if variant is glass
    if (variant === 'glass') {
      className += ' modal-glass';
    }
    
    return className;
  };

  // Don't render if not open
  if (!isOpen) return null;

  // Use portal to render modal at the root level of the DOM
  return createPortal(
    <div className="modal">
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={handleBackdropClick}></div>
      
      {/* Modal container */}
      <div className={getModalContainerClass()} ref={modalRef}>
        {/* Modal header */}
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title && <h2>{title}</h2>}
            {showCloseButton && (
              <button
                type="button"
                className="close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            )}
          </div>
        )}
        
        {/* Modal body */}
        <div className="modal-body">
          {children}
        </div>
        
        {/* Modal footer */}
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  variant: PropTypes.oneOf(['default', 'glass']),
  closeOnEsc: PropTypes.bool,
  closeOnBackdrop: PropTypes.bool,
  showCloseButton: PropTypes.bool
};

// Predefined footer with cancel and confirm buttons
Modal.Footer = ({
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  onCancel,
  onConfirm,
  confirmDisabled = false,
  confirmLoading = false,
  cancelDisabled = false,
  confirmVariant = 'primary',
  cancelVariant = 'ghost'
}) => {
  return (
    <>
      <Button
        variant={cancelVariant}
        onClick={onCancel}
        disabled={cancelDisabled}
      >
        {cancelText}
      </Button>
      <Button
        variant={confirmVariant}
        onClick={onConfirm}
        disabled={confirmDisabled}
        loading={confirmLoading}
      >
        {confirmText}
      </Button>
    </>
  );
};

Modal.Footer.propTypes = {
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmDisabled: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  cancelDisabled: PropTypes.bool,
  confirmVariant: PropTypes.string,
  cancelVariant: PropTypes.string
};

export default Modal;
