import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWords } from '../../redux/words/wordsSlice';

const WordsPagination = () => {
    const dispatch = useDispatch();
    const { page, totalPages, status } = useSelector(state => state.words);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && status !== 'loading') {
            dispatch(fetchWords({ page: newPage }));
        }
    };

    if (totalPages <= 1) return null; // якщо лише 1 сторінка — не показуємо

    return (
        <div className="pagination">
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1 || status === 'loading'}
            >
                Previous
            </button>

            <span>Page {page} of {totalPages}</span>

            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages || status === 'loading'}
            >
                Next
            </button>
        </div>
    );
};

export default WordsPagination;
