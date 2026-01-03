import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
    document.body.style.overflow = 'auto';
  }

  handleEscape = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, children } = this.props;

    return ReactDOM.createPortal(
      <div className={styles.overlay} onClick={this.handleBackdropClick}>
        <div className={styles.modal}>
          <button 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13" stroke="#9B9FAA" strokeWidth="2" />
              <path d="M1 13L13 1" stroke="#9B9FAA" strokeWidth="2" />
            </svg>
          </button>
          {children}
        </div>
      </div>,
      document.getElementById('modal-root')
    );
  }
}

export default Modal;