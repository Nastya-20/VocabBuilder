import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addWord } from '../../redux/words/wordsSlice';
import { toast } from 'react-toastify';
import css from '../Modals/AddWordForm.module.css';

// Схема валідації
const schema = yup.object().shape({
    en: yup
        .string()
        .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, 'Invalid English word')
        .required('English word is required'),
    ua: yup
        .string()
        .matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, 'Invalid Ukrainian word')
        .required('Ukrainian word is required'),
});

const AddWordForm = ({ onClose }) => {
    const dispatch = useDispatch();
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { en: '', ua: ''},
    });

 
    const onSubmit = async (data) => {
        try {
            await dispatch(addWord(data)).unwrap();
            toast.success('Word added successfully!');
            reset();
            onClose();
        } catch (error) {
            toast.error(error.message || 'Failed to add word');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={css.addWordForm}>
            <div className={css.inputGroup}>
            <svg
                className={css.iconUk}
                aria-hidden="true"
                width="28"
                height="28"
            >
                <use href="/icons.svg#icon-ukraine" />
            </svg>
            <label className={css.label}>
                    Ukrainian
                </label>
            </div>
                <input className={css.input} type="text" {...register('ua')} placeholder='' />
                {errors.ua && <p className={css.error}>{errors.ua.message}</p>}
             
            <div className={css.inputGroup}>
            <svg
                className={css.iconEn}
                aria-hidden="true"
                width="28"
                height="28"
            >
                <use href="/icons.svg#icon-united-kingdom" />
            </svg>
            <label className={css.label}>
                    English
                </label>
            </div>
                <input className={css.input} type="text" {...register('en')}  placeholder=''/>
                {errors.en && <p className={css.error}>{errors.en.message}</p>}
          
               <button className={css.formSave} type="submit" disabled={isSubmitting}>Save</button>
               <button className={css.formCancel} type="button" onClick={onClose}>Cancel</button>
           </form>
    );
};

export default AddWordForm;
