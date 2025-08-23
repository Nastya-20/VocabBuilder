import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWords } from '../../redux/words/wordsSlice';
import { fetchStatistics } from '../../redux/statistics/statisticsSlice';
import Dashboard from '../../components/Dashboard/Dashboard';
import WordsTable from '../../components/WordsTable/WordsTable';
import WordsPagination from '../../components/WordsPagination/WordsPagination';

const DictionaryPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWords({ page: 1 }));
        dispatch(fetchStatistics());
    }, [dispatch]);

    return (
        <div>
            <Dashboard />
            <WordsTable />
            <WordsPagination />
        </div>
    );
};

export default DictionaryPage;
