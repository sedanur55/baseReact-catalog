import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const AreaContext = createContext();

export function useArea() {
  return useContext(AreaContext);
}

export function AreaProvider({ children }) {
  const [areas, setAreas] = useState([]);
  const [isLoadingArea, setIsLoadingArea] = useState(true);
  const fetchAreas = async () => {
    try {
      axios("http://localhost:3003/areas")
        .then((res) => setAreas(res.data))
        .catch((e) => console.log(e))
        .finally(() => setIsLoadingArea(false));
    } catch (error) {
      console.error('Area verilerini alma hatası: ', error);
    }
  };
  useEffect(() => {
    fetchAreas();
  }, []);
  const areaContextValue = {
    areas,
    fetchAreas,
    isLoadingArea,
  };

  return (
    <AreaContext.Provider value={areaContextValue}>
      {children}
    </AreaContext.Provider>
  );
}