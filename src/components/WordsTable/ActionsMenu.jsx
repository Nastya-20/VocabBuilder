import { IconButton, Popover, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

const ActionsMenu = ({ onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <IconButton onClick={handleOpen}>
                <MoreVertIcon />
            </IconButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <MenuItem
                    onClick={() => {
                        onEdit();
                        handleClose();
                    }}
                >
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        onDelete();
                        handleClose();
                    }}
                >
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
};

export default ActionsMenu;
