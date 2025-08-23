import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWords } from '../../redux/words/wordsSlice';

const WordsPagination = ({limit = 10}) => {
    const dispatch = useDispatch();
    const {items, page, totalPages, status, error } = useSelector(
        state => state.words
    );

    useEffect(() => {
        dispatch(fetchWords({ page: 1, limit }));
    }, [dispatch, limit]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && status !== 'loading') {
            dispatch(fetchWords({ page: newPage }));
        }
    };

    // if (totalPages <= 1) return null; // якщо лише 1 сторінка — не показуємо
    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <div>
            <ul>
                {items.map((word) => (
                    <li key={word.id}>{word.name}</li>
                ))}
            </ul>

            <div>
                <button
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                >
                    Prev
                </button>

                <span>
                    {page} / {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default WordsPagination;
