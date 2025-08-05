import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/categories/categoriesSlice';
import { fetchWords } from '../../redux/words/wordsSlice';
import { fetchStatistics } from '../../redux/statistics/statisticsSlice';
import Dashboard from '../../components/Dashboard/Dashboard';
import WordsTable from '../../components/WordsTable/WordsTable';
import UseBar from '../../components/UserBar/UserBar';
import UserNav from '../../components/UserNav/UserNav';
import WordsPagination from '../../components/WordsPagination/WordsPagination';

const DictionaryPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchWords({ page: 1 }));
        dispatch(fetchStatistics());
    }, [dispatch]);

    return (
        <div>
            <UseBar />
            <UserNav/>
            <Dashboard />
            <WordsTable />
            <WordsPagination />
        </div>
    );
};

export default DictionaryPage;
