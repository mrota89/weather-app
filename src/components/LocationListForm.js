import React, { useState } from 'react';

//component con form per aggiunta città preferite
const LocationListForm = ({ saveLocation }) => {
  const [value, setValue] = useState('');
  
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        saveLocation(value);
        setValue('');
      }}
    >
      <input 
        className="location-form"
        placeholder="Scrivi una località e premi Invio"
        autoComplete="off"
        value={value}
        onChange={event => {
          setValue(event.target.value);
        }}
      />
    </form>
  );
};
export default LocationListForm;