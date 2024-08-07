import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const LocationContext = createContext();

export function useLocation() {
  return useContext(LocationContext);
}
export function LocationProvider({ children }) {
  const [locations, setLocations] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const fetchLocations = async () => {
    try {
      axios("http://localhost:3003/locations")
        .then((res) => setLocations(res.data))
        .catch((e) => console.log(e))
        .finally(() => setIsLoadingLocation(false));
    } catch (error) {
      console.error('Location verilerini alma hatası: ', error);
    }
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  const locationContextValue = {
    locations,
    fetchLocations,
    isLoadingLocation,
  };

  return (
    <LocationContext.Provider value={locationContextValue}>
      {children}
    </LocationContext.Provider>
  );
}