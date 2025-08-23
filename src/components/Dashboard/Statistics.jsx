import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../../redux/statistics/statisticsSlice';
import css from '../Dashboard/Statistics.module.css';
const Statistics = () => {
    const dispatch = useDispatch();
    const { totalCount, tasks, status, error } = useSelector(state => state.statistics);

    useEffect(() => {
        dispatch(fetchStatistics());
    }, [dispatch]);

    if (status === 'loading') {
        return <p>Loading statistics...</p>;
    }

    if (status === 'failed') {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    return (
        <div className="statistics">
            <p className={css.study}>
                To study: <strong className={css.strong}>{totalCount}
                </strong>
            </p>
        </div>
    );
};

export default Statistics;
