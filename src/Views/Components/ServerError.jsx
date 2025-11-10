import React, { memo } from 'react';
import { Box } from '@mui/material';

const ServerError = ({ message = "Please wait, server is down.",
    //  onRetry
}) => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: '#efe5e5ff',
                color: '#721c24',
                textAlign: 'center',
                px: 2,
            }}
        >
            <Box sx={{ fontSize: 28, fontWeight: 'bold' }}>
                {message}
            </Box>
            <Box sx={{ fontSize: 16, mt: 1 }}>
                We're trying to reconnect.
            </Box>
        </Box>
    );
};

export default memo(ServerError);
