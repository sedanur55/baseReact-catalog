import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const GmmContext = createContext();

export function useGmm() {
  return useContext(GmmContext);
}
export function GmmProvider({ children }) {
  const [gmms, setGmms] = useState([]);
  const [isLoadingGmm, setIsLoadingGmm] = useState(true);
  const fetchGmms = async () => {
    try {
      axios("http://localhost:3003/gmms")
        .then((res) => setGmms(res.data))
        .catch((e) => console.log(e))
        .finally(() => setIsLoadingGmm(false));
    } catch (error) {
      console.error('Gmm verilerini alma hatası: ', error);
    }
  };
  useEffect(() => {
    fetchGmms();
  }, []);

  const gmmContextValue = {
    gmms,
    fetchGmms,
    isLoadingGmm,
  };

  return (
    <GmmContext.Provider value={gmmContextValue}>
      {children}
    </GmmContext.Provider>
  );
}