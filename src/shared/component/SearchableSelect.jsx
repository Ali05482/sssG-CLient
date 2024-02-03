import React, { useState } from 'react';
import Select from 'react-select';

const SearchableSelect = ({ options, onChange, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onChange(selectedOption);
  };

  return (
    <Select
        required
        className='w-50'
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isSearchable
        placeholder={placeholder}
      />
  );
};

export default SearchableSelect;
