import { LinearProgress, Box } from '@mui/material';

const ProgressBar = ({ value }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={value} />
        </Box>
    );
};

export default ProgressBar;
