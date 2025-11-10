import { Box, Skeleton } from '@mui/material';
import { memo } from 'react';

const violetWaveStyle = {
    animation: 'wave 1.6s ease-in-out 0.5s infinite',
    background: 'linear-gradient(90deg, #d3bceaff 25%, #b78fdf 50%, #d3bceaff 75%)',
    backgroundSize: '200% 100%',
    backgroundRepeat: 'no-repeat',
};

const PatientBoxSkeleton = () => {
    return (
        <Box variant="outlined"
            sx={{
                width: '100%',
                flex: 1,
                borderRadius: 2,
                boxShadow: 'sm',
                pb: 2,
                px: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#e9ecef',
                flexWrap: 'wrap',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background:
                        'linear-gradient(90deg, rgba(211,188,234,0.3) 0%, rgba(183,143,223,0.5) 50%, rgba(211,188,234,0.3) 100%)',
                    zIndex: 1,
                },
            }}>
            {/* Header Skeleton */}
            <Box
                sx={{
                    width: '100%',
                    height: 30,
                    alignItems: 'center',
                    display: 'flex',
                    gap: 1,
                }}
            >
                <Skeleton
                    variant="text"
                    width={60}
                    height={24}
                    sx={{ borderRadius: 1, ...violetWaveStyle }}
                />
                <Skeleton
                    variant="text"
                    width="50%"
                    height={24}
                    sx={{ borderRadius: 1, ...violetWaveStyle }}
                />
            </Box>

            {/* Skeleton Test Result Boxes */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 0.3,
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    mt: 1,
                }}
            >
                {[...Array(6)].map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'xs',
                            height: 15,
                            width: 60,
                            px: 1,
                        }}
                    >
                        <Skeleton
                            variant="text"
                            width="100%"
                            height={15}
                            sx={{ borderRadius: 1, ...violetWaveStyle }}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default memo(PatientBoxSkeleton);
