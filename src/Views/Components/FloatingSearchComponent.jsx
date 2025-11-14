import React, { useState, useEffect, useRef, memo } from 'react';
import { IconButton, Box, Tooltip } from '@mui/material';
import search from '../images/search.gif';
import CloseIcon from '@mui/icons-material/Close';
import UserInput from './UserInput';
import { bounce } from '../Common/CommonCode';
// Bounce animation for the search button

const FloatingSearchComponent = ({ onSearchChange }) => {

    const [searchOpen, setSearchOpen] = useState(false);  // To toggle search bar visibility
    const [searchQuery, setSearchQuery] = useState('');  // Search query input
    const searchRef = useRef(null); // To attach the search bar container
    const inputRef = useRef(null); // To focus the input when search opens

    // Toggle search bar visibility
    const handleSearchToggle = () => {
        setSearchOpen((prev) => !prev);  // Toggle search bar visibility
    };

    // Handle input change and pass the query to the parent component
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearchChange(query);
    };

    // Close search when the close icon is clicked
    const handleCloseSearch = () => {
        setSearchOpen(false);
        onSearchChange('');
        onSearchChange('');  // Clear search query
    };

    // Focus input when the search bar is open
    useEffect(() => {
        if (searchOpen) {
            inputRef.current.focus();
        }
    }, [searchOpen]);

    return (
        <>
            {/* Floating Search Button */}
            {
                !searchOpen &&
                <Tooltip title="Search here" arrow>
                    <IconButton onClick={handleSearchToggle} aria-label="Search"
                        sx={{
                            width: 60,
                            height: 60,
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            zIndex: 1000,
                            background: 'white',
                            borderRadius: '50%',
                            border: '2px solid #007BFF',
                            padding: 0,
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                            animation: `${bounce} 1s ease-in-out infinite`,
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                            '&:focus': {
                                outline: 'none',
                            }
                        }}>
                        <img src={search} alt="Search"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%',
                            }} />
                    </IconButton>
                </Tooltip>

            }
            {/* Expanding Search Bar */}
            <Box
                ref={searchRef}
                sx={{
                    position: 'fixed',
                    bottom: 36,
                    right: 16,
                    zIndex: 1001,
                    display: searchOpen ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: searchOpen ? 400 : 0,  // Expand width when open, 0 when closed
                    height: searchOpen ? 60 : 0,  // Set height for the input field when open
                    transition: 'width 0.3s ease, height 0.3s ease',  // Smooth transition for expanding
                    borderRadius: '8px',
                    gap:0.5
                }}
            >
                {/* Search Input */}
                <UserInput
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    handleSearchToggle={handleSearchToggle}
                    inputRef={inputRef}
                />

                {/* Close Button (Icon) */}
                <IconButton
                    onClick={handleCloseSearch}
                    sx={{
                        padding: '10px',
                        background: '#aca6a6ff',
                        '&:hover': {
                            background: '#ffffffff',  // Change color on hover
                            color: 'white',
                        },
                    }}
                >
                    <CloseIcon sx={{ color: 'black' }} />
                </IconButton>
            </Box>
        </>
    );
};

export default memo(FloatingSearchComponent);
