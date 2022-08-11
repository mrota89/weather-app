import React, { useState } from 'react';

//component con form per aggiunta città preferite
const LocationListForm = ({ saveLocation }) => {
  const [value, setValue] = useState('');

  //esclude numeri e carratteri speciali
  const regexLocationName = new RegExp(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1\u0027\u203e]*$/g);

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
        onChange={(event) => {
          //controllo input utente
          if(regexLocationName.test(event.target.value)) {
            setValue(event.target.value);
          } else{
            alert(["Attenzione: non sono ammessi numeri e caratteri speciali"])
          }
        }}
      />
    </form>
  );
};
export default LocationListForm;