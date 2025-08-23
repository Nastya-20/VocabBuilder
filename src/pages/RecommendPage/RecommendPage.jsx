// pages/RecommendPage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from '../components/Dashboard/Dashboard';
import WordsTableRecommend from '../components/WordsTable/WordsTableRecommend';
import WordsPagination from '../components/WordsPagination/WordsPagination';
import { fetchWords } from '../redux/words/wordsSlice';

const RecommendPage = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.words);

    useEffect(() => {
        dispatch(fetchWords({ page: 1, limit: 10 }));
    }, [dispatch]);

    return (
        <div>
            <Dashboard />
            <WordsTableRecommend words={items} />
            <WordsPagination limit={10} />
        </div>
    );
};

export default RecommendPage;

