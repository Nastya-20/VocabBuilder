import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import AddWordForm from './AddWordForm';
import css from '../Modals/AddWordModal.module.css';


const modalRoot = document.getElementById('modal-root');

const AddWordModal = ({ onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.code === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return modalRoot
        ? createPortal(
            <div className={css.modalBackdrop} onClick={handleBackdropClick}>
                <div className={css.modalContent}>
                    <button className={css.closeBtn} onClick={onClose}>✕</button>
                    <AddWordForm onClose={onClose} />
                </div>
            </div>,
            modalRoot
        )
        : null;
};

export default AddWordModal;
