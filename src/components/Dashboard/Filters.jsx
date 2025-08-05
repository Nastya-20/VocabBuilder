import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { fetchWords } from '../../redux/words/wordsSlice';
import css from '../Dashboard/Filters.module.css';

const Filters = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.items);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const handleSearch = useCallback(
        debounce((value) => {
            dispatch(fetchWords({ page: 1, search: value.trim(), category }));
        }, 300),
        [dispatch, category]
    );

    const onChangeSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        handleSearch(value);
    };

    const onChangeCategory = (e) => {
        setCategory(e.target.value);
        dispatch(fetchWords({ page: 1, search, category: e.target.value }));
    };

    return (
        <>
            <div className={css.inputs}>
                <input
                    type="text"
                    placeholder="Find the word..."
                    value={search}
                    onChange={onChangeSearch}
                    className={css.filter}
                />
                <select value={category} onChange={onChangeCategory} className={css.select}>
                    <option value="">Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
                {category === 'verb' && (
                    <div>
                        <label><input type="radio" name="verbType" value="regular" /> Regular</label>
                        <label><input type="radio" name="verbType" value="irregular" /> Irregular</label>
                    </div>
                )}
            </div>
         </>
    );
};

export default Filters;
