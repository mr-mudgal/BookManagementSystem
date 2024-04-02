import React, {useEffect, useState} from 'react';
import "./CreateNewBook.css"

const SearchBox = ({words, onSelect}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (searchTerm !== '') {
            const filteredSuggestions = words?.filter((word) =>
                word?.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([])
        }
    }, [searchTerm, words]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSelect = (selectedWord) => {
        setSearchTerm(selectedWord);
        setSuggestions([]);
        onSelect(selectedWord); // Call callback function with selected word
    };

    return (
        <div className="search-box" style={{display: 'flex', minHeight: '40px'}}> {/* Set minimum height */}
            <input
                type="text"
                placeholder="Search with book title..."
                value={searchTerm}
                onChange={handleChange}
                style={{
                    borderRadius: "10px",
                    height: "20px",
                    width: "250px",
                    padding: "10px",
                    outline: "none",
                    border: "3px solid white",
                    flexGrow: 1,
                    display: "block",
                    background: "#228b2288",
                    color: "white",
                    "&::placeholder": {color: "white !important"}
                }}
            />
            {suggestions.length > 0 && (
                <ul className="suggestions" style={{listStyle: 'none', padding: "10px", position: "absolute", marginTop: "6dvh", background: "#228b2288", width: "250px", borderRadius: "15px"}}>
                    {suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => handleSelect(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBox;
