import React, { useState } from 'react';
import "./css/LocationListForm.css"

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
      <input className="location-form"
        placeholder="Aggiungi una città..."
        onChange={event => {
          setValue(event.target.value);
        }}
        value={value}
      />
    </form>
  );
};
export default LocationListForm;