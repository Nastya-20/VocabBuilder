import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Filters from '../Dashboard/Filters';
import Statistics from './Statistics';
import AddWordModal from '../Modals/AddWordModal';
import css from '../Dashboard/Dashboard.module.css';

const Dashboard = ({
    onFilterChange,
    filterValues,
    statisticsData,
    onAddWord
}) => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const openAddModal = () => setAddModalOpen(true);
    const closeAddModal = () => setAddModalOpen(false);

    return (
        <section className={css.dashboard}>
            <Filters
                filterValues={filterValues}
                onFilterChange={onFilterChange}
            />

            <Statistics data={statisticsData} />

            <div className={css.dashboardActions}>
                <button className={css.addWord} type="button" onClick={openAddModal}>Add Word
                <svg className={css.iconPlus}
                    aria-hidden="true"
                    width="20"
                    height="20"
                >
                    <use href="/icons.svg#icon-plus" />
                </svg>
                </button>
                <Link to="/training" className={css.trainLink}>
                    Train oneself
                    <svg className={css.iconPlus}
                        aria-hidden="true"
                        width="20"
                        height="20"
                    >
                        <use href="/icons.svg#icon-switch-horizontal" />
                    </svg>
                </Link>
            </div>

            {isAddModalOpen && <AddWordModal onClose={closeAddModal} onAddWord={onAddWord} />}
        </section>
    );
};

export default Dashboard;
