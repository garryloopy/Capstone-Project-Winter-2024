// FilterButton.js
import React from "react";

const FilterButton = ({
  contents,
  filterType,
  currentFilter,
  onFilterButtonClick,
}) => {
  const handleOnFilterButtonClick = () => {
    if (onFilterButtonClick) {
      onFilterButtonClick(filterType);
    }
  };

  return (
    <button
      className={`text-lg font-semibold w-48 h-10 rounded-3xl text-slate-800 ${
        currentFilter === filterType
          ? "opacity-100 bg-yellow-400 shadow-md"
          : "opacity-50 hover:opacity-100 transition-opacity duration-300"
      }`}
      onClick={handleOnFilterButtonClick}
    >
      {contents}
    </button>
  );
};

export default FilterButton;
