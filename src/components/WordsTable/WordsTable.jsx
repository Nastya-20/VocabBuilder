import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from 'react-table';
import { IconButton, Popover, MenuItem, LinearProgress } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditWordModal from '../../components/Modals/EditWordModal';
import { deleteWord } from '../../redux/words/wordsSlice';

const WordsTable = () => {
    const dispatch = useDispatch();
    const words = useSelector(state => state.words.items);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedWord, setSelectedWord] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleOpenActions = (event, word) => {
        setAnchorEl(event.currentTarget);
        setSelectedWord(word);
    };

    const handleCloseActions = () => {
        setAnchorEl(null);
        setSelectedWord(null);
    };

    const handleEdit = () => {
        setEditModalOpen(true);
        handleCloseActions();
    };

    const handleDelete = () => {
        if (selectedWord) {
            dispatch(deleteWord(selectedWord.id));
        }
        handleCloseActions();
    };

    const data = React.useMemo(() => words, [words]);

    const columns = React.useMemo(
        () => [
            { Header: 'Word', accessor: 'en' },
            { Header: 'Translation', accessor: 'ua' },
            {
                Header: 'Progress',
                accessor: 'progress',
                Cell: ({ value }) => (
                    <LinearProgress variant="determinate" value={value} />
                ),
            },
            {
                Header: 'n',
                Cell: ({ row }) => (
                    <IconButton onClick={(e) => handleOpenActions(e, row.original)}>
                        <MoreVertIcon />
                    </IconButton>
                ),
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <div>
            <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    {headerGroups.map(headerGroup => {
                        const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                        return (
                            <tr key={key} {...restHeaderGroupProps} style={{ borderBottom: '1px solid #ddd' }}>
                                {headerGroup.headers.map(column => {
                                    const { key, ...restColumnProps } = column.getHeaderProps();
                                    return (
                                        <th key={key} {...restColumnProps} style={{ padding: '10px', textAlign: 'left' }}>
                                            {column.render('Header')}
                                        </th>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        const { key, ...restRowProps } = row.getRowProps();
                        return (
                            <tr key={key} {...restRowProps} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                {row.cells.map(cell => {
                                    const { key, ...restCellProps } = cell.getCellProps();
                                    return (
                                        <td key={key} {...restCellProps} style={{ padding: '10px' }}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Actions Popover */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleCloseActions}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Popover>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <EditWordModal
                    word={selectedWord}
                    onClose={() => setEditModalOpen(false)}
                />
            )}
        </div>
    );
};

export default WordsTable;

