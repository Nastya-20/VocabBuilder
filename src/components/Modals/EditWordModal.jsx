import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { editWord } from '../../redux/words/wordsSlice';

const schema = yup.object().shape({
    en: yup.string().matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, 'Invalid English word').required(),
    ua: yup.string().matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, 'Invalid Ukrainian word').required(),
});

const EditWordModal = ({ word, onClose }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { en: word.en, ua: word.ua },
    });

    const onSubmit = (data) => {
        dispatch(editWord({ id: word.id, updates: data }))
            .unwrap()
            .then(() => onClose())
            .catch(err => console.error('Edit failed:', err));
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Edit Word</h3>

                <input {...register('en')} placeholder="English" />
                {errors.en && <p>{errors.en.message}</p>}

                <input {...register('ua')} placeholder="Ukrainian" />
                {errors.ua && <p>{errors.ua.message}</p>}

                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EditWordModal;
