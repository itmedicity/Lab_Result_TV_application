import React, { memo } from 'react';
import '../Style/input.css'
// Custom UserInput Component
const UserInput = ({ searchQuery, handleSearchChange, inputRef, placeholder = "Search Here" }) => {
    return (
        <div className="search-container"
        >
            <input
                ref={inputRef}
                className="search-input"
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default memo(UserInput);
