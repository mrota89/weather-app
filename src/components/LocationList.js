import React from 'react';

//component per render lista città preferite
const LocationList = ({ locationList, deleteLocation }) => (
  <div className="location-list wmt-1">
    {locationList.map((location, index) => (
      <div className="list-item" key={index.toString()}>
        <p>{location}</p>
        <div className="delete"
          onClick={() => {
            deleteLocation(index);
          }}
        >x</div>
      </div>
    ))}
  </div>
);

export default LocationList;