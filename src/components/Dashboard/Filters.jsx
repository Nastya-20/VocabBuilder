import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { fetchWords } from '../../redux/words/wordsSlice';
import Loader from "../../components/Loader/Loader";
import css from './Filters.module.css';

const Filters = () => {
    const dispatch = useDispatch();
    const { items: categories = [], isLoading, error } = useSelector(state => state.categories);

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [verbType, setVerbType] = useState('');

    // debounce для пошуку
    const handleSearch = useCallback(
        debounce((value, category, isIrregular) => {
            const sanitized = value.trim();
            dispatch(fetchWords({
                keyword: sanitized || undefined,
                category: category || undefined,
                isIrregular: category === 'verb' ? isIrregular : undefined,
                page: 1,
                limit: 7
            }));
        }, 300),
        [dispatch]
    );

    const onChangeSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        handleSearch(value, category, verbType);
    };

    const onChangeCategory = (e) => {
        const value = e.target.value;
        setCategory(value);
        handleSearch(search, value, verbType);
    };

    const onChangeVerbType = (e) => {
        const value = e.target.value;
        const isIrregular = value === 'irregular';
        setVerbType(value);
        handleSearch(search, category, isIrregular);
    };

    return (
        <div className={css.inputs}>
            <input
                type="text"
                placeholder="Find the word..."
                value={search}
                onChange={onChangeSearch}
                className={css.filter}
            />
            <svg className={css.iconSearch} aria-hidden="true" width="20" height="20">
                <use href="/icons.svg#search" />
            </svg>

            <select value={category} onChange={onChangeCategory} className={css.select}>
                <option value="">Categories</option>
                {categories.map(cat => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            {category.toLowerCase() === 'verb' && (
                <div className={css.verbType}>
                    <label className={css.verbName}>
                        <input
                            type="radio"
                            name="verbType"
                            value="regular"
                            className={css.verbCircle}
                            checked={verbType === 'regular'}
                            onChange={onChangeVerbType}
                        /> Regular
                    </label>
                    <label className={css.verbName}>
                        <input
                            type="radio"
                            name="verbType"
                            value="irregular"
                            checked={verbType === 'irregular'}
                            onChange={onChangeVerbType}
                        /> Irregular
                    </label>
                </div>
            )}

            {isLoading && <Loader />}
            {error && <p className={css.error}>{error}</p>}
        </div>
    );
};

export default Filters;



