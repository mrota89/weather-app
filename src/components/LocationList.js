import React from 'react';
import"./css/LocationList.css"

const LocationList = ({ locationList, deleteLocation, childToParent }) => (
  
  <div className="location-list">
    {locationList.map((location, index) => (
      <div className="list-item" key="index">
        <p
        onClick={() => {
          childToParent(location)
        }}
        >{location}</p>
        
        <div 
          className="delete"
          onClick={() => {
            deleteLocation(index);
          }}
        >x</div>
      </div>
    ))}
  </div>
);

export default LocationList;