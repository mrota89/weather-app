import React, { useState } from 'react';
import './css/Sidebar.css';
import { slide as Menu } from 'react-burger-menu';
import LocationListForm from './LocationListForm';
import LocationList from './LocationList';


const Sidebar = () => {
  const [locationList, setLocationList] = useState([]);

  const [data, setData] = useState('');

  const childToParent = (childData) => {
    setData(childData);
    console.log(childData)
  }

  return (
    <Menu>
        <h4>Le tue città</h4>
        <h5>Puoi salvare un massimo di cinque città</h5>
       <LocationListForm saveLocation={locationName => {
          const trimmedLocationName = locationName.trim().toUpperCase();
          if(locationList.includes(trimmedLocationName)) {
            return alert(["Attenzione! città già presente nella lista"])
          } else if (locationList.length === 5) {
            return alert(["Attenzione! Puoi salvare al massimo cinque città"])
          } else {
            setLocationList([...locationList, trimmedLocationName]);
          }
        }} 
      />

      {locationList.length > 0 && <LocationList locationList={locationList}
          childToParent={childToParent}

          deleteLocation={locationId => {
              const newLocationList = locationList.filter((_,index) => index !== locationId);
              setLocationList(newLocationList);
            }
          }
      />}
    </Menu>
  );
};

export default Sidebar;