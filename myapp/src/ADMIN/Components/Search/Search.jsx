// Search.jsx
import React, { useState } from "react";
// Assuming SearchButton is a light-colored icon that works on the dark background
import SearchButton from "../../../assets/search.svg"; 

const Search = (props) => {
  // Simpler state initialization
  const [searchTerm, setSearchTerm] = useState(''); 
  return (
    <div className='searchContainer'>
      <img
        src={SearchButton}
        alt="searchButton"
        className='searchButton'
      />
      <input
        type="text"
        placeholder={props.placeholder}
        className='search'
        // Simplified value assignment
        value={searchTerm} 
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;