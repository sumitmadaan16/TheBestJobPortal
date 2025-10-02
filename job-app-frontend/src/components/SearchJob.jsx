import React, { useState, useEffect } from "react";

const SearchJob = ({ onSearch, onClearSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (searchTerm.trim() === "") {
            onClearSearch();
            return;
        }

        const debounceTimeout = setTimeout(() => {
            onSearch(searchTerm.trim());
        }, 300);

        return () => clearTimeout(debounceTimeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const handleClear = () => {
        setSearchTerm("");
        onClearSearch();
    };

    return (
        <div className="search-container">
            <div className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search jobs by technology..."
                    className="search-input"
                />
                <button type="button" onClick={handleClear} className="clear-btn">
                    Clear
                </button>
            </div>
        </div>
    );
};

export default SearchJob;
