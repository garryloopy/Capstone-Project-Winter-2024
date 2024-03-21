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
          ? "text-orange-600 border-b-2 border-orange-600"
          : "text-gray-800"
      }`}
      onClick={handleOnFilterButtonClick}
    >
      {contents}
    </button>
  );
};

export default FilterButton;
