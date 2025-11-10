import React, { memo } from 'react'
import { Box, Grid } from '@mui/joy';
import PatientBoxSkeleton from './PatientBoxSkeleton';
const MainLoading = () => {
    return (
        <>
            <Grid container spacing={0.5} sx={{ p: 2 }}>
                {
                    Array.from({ length: 14 }).map((_, index) => (
                        <Grid key={index} xs={12} sm={6} md={6} lg={6} xl={4}>
                            <PatientBoxSkeleton />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}

export default memo(MainLoading)