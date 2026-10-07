import React from "react";
import { useEffect, useState } from "react";

const SearchBar = ({ search, setSearch }) => {
  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, setSearch]);

  return (
    <div className="search-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search by Product Name or SKU..."
      />
    </div>
  );
};

export default SearchBar;
