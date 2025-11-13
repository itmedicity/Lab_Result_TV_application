import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Grid } from '@mui/joy';
import { getPatientLabResults, groupPatientLabResults } from '../Common/CommonCode';
import PatientLabRecord from './PatientLabRecord';
import { useQuery } from '@tanstack/react-query';
import PatientBoxSkeleton from '../Components/PatientBoxSkeleton';
import ServerError from '../Components/ServerError';
import { useMediaQuery } from '@mui/material';
import FloatingSearchComponent from '../Components/FloatingSearchComponent';

const LabDashboard = () => {
    // Reference for the scrollable container
    const scrollRef = useRef(null);
    // Detect if the screen orientation is landscape
    const isLandscape = useMediaQuery('(orientation: landscape)');
    // State to hold the search query
    const [searchQuery, setSearchQuery] = useState('');

    /* Fetch patient lab results using React Query */
    const {
        data: Patientlabresults,
        isLoading: LoadingPatientResult,
        error: PaitneResultError
    } = useQuery({
        queryKey: ['patientlabresult'],
        queryFn: getPatientLabResults,
        refetchInterval: 900000, // 15 minutes in ms
        staleTime: 900000,       // Keep data fresh for 15 minutes
        refetchOnWindowFocus: false
    });

    /*Group raw patient lab results Memoized to avoid recomputing unless data changes*/
    const groupedResults = useMemo(() => {
        return groupPatientLabResults(Patientlabresults);
    }, [Patientlabresults]);

    /* Filter and sort grouped patient results for display */
    const filteredAndSortedPatients = useMemo(() => {
        if (!groupedResults) return [];

        return groupedResults
            // Filter patients where not all tests are doctor-viewed
            ?.filter(patient => !patient?.tests?.every(test => test?.doctor_viewed === 'Y'))
            // Sort by result verification progress
            ?.sort((a, b) => {
                // Helper to compute a "score" for sorting
                const calcScore = (tests) => {
                    const total = tests?.length || 0;
                    const verified = tests?.filter(t => t?.result === 'Y').length;
                    // Fully verified => 2, partially => 1, none => 0
                    return verified === total ? 2 : verified > 0 ? 1 : 0;
                };
                return calcScore(b.tests) - calcScore(a.tests);
            });
    }, [groupedResults]);


    // Filter patients based on the search query
    const filteredPatients = useMemo(() => {
        if (searchQuery.trim() === '') return filteredAndSortedPatients;

        return filteredAndSortedPatients?.filter(patient => {
            const patientName = patient?.name?.toLowerCase() || '';
            const mrdNumber = patient?.pt_no?.toLowerCase() || '';
            const searchTerm = searchQuery.toLowerCase();
            return patientName.includes(searchTerm) || mrdNumber.includes(searchTerm);
        });
    }, [filteredAndSortedPatients, searchQuery]);

    // Scrolls up and down automatically in a loop
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let scrollDown = true;   // Direction flag
        const speed = 1.5;       // Scroll speed in pixels per frame
        let animationFrameId;    // To store animation frame for cleanup

        const scrollStep = () => {
            // Scroll down
            if (scrollDown) {
                container.scrollTop += speed;
                // If reached bottom, reverse direction
                if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
                    scrollDown = false;
                }
            }
            // Scroll up
            else {
                container.scrollTop -= speed;
                // If reached top, reverse direction
                if (container.scrollTop <= 0) {
                    scrollDown = true;
                }
            }
            // Continue the loop
            animationFrameId = requestAnimationFrame(scrollStep);
        };
        // Start the scrolling loop
        animationFrameId = requestAnimationFrame(scrollStep);
        // Cleanup on unmount
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    // Show server error if API fails
    if (PaitneResultError) return <ServerError />;

    return (
        <Box
            ref={scrollRef}
            sx={{
                height: '100vh',
                overflowY: 'auto',
                scrollBehavior: 'smooth',
                bgcolor: '#f0f0f0ff',
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
            }}>
            <FloatingSearchComponent onSearchChange={setSearchQuery} />

            <Grid container spacing={isLandscape ? 0.5 : 0.1} sx={{ p: 2 }}>
                {LoadingPatientResult ? (
                    // Render skeleton loaders while fetching data
                    Array.from({ length: 14 }).map((_, index) => (
                        <Grid key={index} xs={12} sm={6} md={6} lg={6} xl={4}>
                            <PatientBoxSkeleton />
                        </Grid>
                    ))
                ) : (
                    //Render sorted & filtered patient records
                    filteredPatients?.map((patient, index) => (
                        <Grid key={index} xs={12} sm={6} md={6} lg={4} xl={4}>
                            <PatientLabRecord patient={patient} index={index} />
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default memo(LabDashboard);
