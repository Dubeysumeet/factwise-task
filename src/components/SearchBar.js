import React from 'react';
import { FaSearch } from 'react-icons/fa'; 

const SearchBar = ({ search, onSearchChange }) => {
  return (
    <div className="flex justify-center my-4">
      <div className="relative w-1/2 my-3">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border rounded-lg py-2 px-10 w-full"
          placeholder="Search User"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
      </div>
    </div>
  );
};

export default SearchBar;
