import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../../redux/statistics/statisticsSlice';
import css from '../Dashboard/Statistics.module.css';
const Statistics = () => {
    const dispatch = useDispatch();
    const { totalWords, tasks, status, error } = useSelector(state => state.statistics);

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
            <p className={css.study}>To study: <strong className={css.strong}>{totalWords}</strong></p>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task, idx) => (
                        <li key={idx}>{task}</li>
                    ))}
                </ul>
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    );
};

export default Statistics;
