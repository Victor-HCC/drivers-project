import React from 'react'

const MultipleSelect = ({ options, selectedOptions, onChange }) => {
  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      // Deselect the option
      onChange(selectedOptions.filter((selected) => selected !== option));
    } else {
      // Select the option
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div>
      {options.map((option) => {
        return (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => toggleOption(option)}
            />
            {option}
          </label>
        )
      })}
    </div>
  );
}

export default MultipleSelect
