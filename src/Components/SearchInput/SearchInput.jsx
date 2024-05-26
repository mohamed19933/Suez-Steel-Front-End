import React from "react";
import { Data } from  "../index";

const SearchInput = ({ searchText, showClearIcon, onChange, onClear }) => {
  const handleClick = () => {
    onClear();
  };

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <Data.TextField
        id="search-input"
        size="small"
        variant="outlined"
        value={searchText}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <Data.InputAdornment position="start">
              <Data.SearchIcon style={{ cursor: "pointer" }} />
            </Data.InputAdornment>
          ),
          endAdornment: (
            <Data.InputAdornment
              position="end"
              style={{ display: showClearIcon }}
              onClick={handleClick}
            >
              <Data.SearchOffIcon style={{ cursor: "pointer" }} />
            </Data.InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchInput;
