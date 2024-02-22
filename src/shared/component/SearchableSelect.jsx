import React, { useContext, useState } from 'react';
import Select from 'react-select';
import MainContext from '../../app/context/context';

const SearchableSelect = ({ options, onChange, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onChange(selectedOption);
  };
  const global = useContext(MainContext); 
  return (
    <Select
    style={{
      backgroundColor: global?.theme?.backgroundColor,
      color: global?.theme?.inputColor,
    }}
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
