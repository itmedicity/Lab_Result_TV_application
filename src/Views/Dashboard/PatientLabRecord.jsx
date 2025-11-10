import React, { memo } from 'react';
import { Typography, Box, Divider } from '@mui/joy';
import '../../App.css'

const PatientLabRecord = ({ patient, index }) => {

    const allTestsResultY = patient?.tests?.every(test => test.result === "Y");

    return (
        <Box
            variant="outlined"
            sx={{
                width: '100%',
                flex: 1,
                borderRadius: 5,
                boxShadow: 'sm',
                height: 80,
                pb: 1,
                px: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#e9ecef',
                flexWrap: 'wrap',
                border: 2,
                borderColor: '#502c6dff',
                ...(allTestsResultY && {
                    animation: `blinkGreen 1s infinite alternate`,
                    animationDelay: `${index * 0.8}s`, // ?? delay based on index
                }),
            }}
        >
            {/* Header with MRD and Name */}
            <Box
                sx={{
                    width: '100%',
                    height: '30%',
                    alignContent: 'center',
                    display: 'flex',
                    gap: 1,
                }}
            >
                <Typography sx={{
                    fontSize: 18, color: '#502c6dff', fontWeight: 800,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',

                }}>
                    {patient?.pt_no}
                </Typography>
                <Divider orientation="vertical" sx={{ width: 2, bgcolor: 'pink', my: 1, height: '70%' }} />
                <Typography
                    sx={{
                        fontSize: 18,
                        color: '#502c6dff',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {patient?.name}
                </Typography>
            </Box>

            {/* Results */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 0.3,
                    width: '100%',
                    height: '70%',
                    justifyContent: 'center',
                    pt: 1.5,
                    flexWrap: 'wrap',
                    overflowY: 'auto',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
            >
                {patient?.
                    tests?.map((res, index) => (
                        <Box
                            key={index}
                            sx={{
                                borderRadius: 'xs',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: 'xs',
                                height: 15,
                                width: 60,
                                px: 1,
                                backgroundColor:
                                    res.result === 'Y' ? '#2a8634ff' : '#a83131ff',
                                color: 'white',
                                fontSize: 10,
                                fontWeight: 600,
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 10,
                                    fontWeight: 600,
                                    color: '#ced4da',
                                    width: '100%',
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {res.name}
                            </Typography>
                        </Box>
                    ))}
            </Box>
        </Box>
    );
};

export default memo(PatientLabRecord);
