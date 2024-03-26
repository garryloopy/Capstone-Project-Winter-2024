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
      className={`text-lg font-medium ${
        currentFilter === filterType
          ? "text-orange-600 border-b-2 border-orange-600 opacity-100"
          : "text-slate-800 opacity-50 hover:opacity-100 transition-opacity duration-300"
      }`}
      onClick={handleOnFilterButtonClick}
    >
      {contents}
    </button>
  );
};

export default FilterButton;
