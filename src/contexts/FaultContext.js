import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const FaultContext = createContext();

export function useFault() {
  return useContext(FaultContext);
}

export function FaultProvider({ children }) {
  const [faults, setFaults] = useState([]);
  const [isLoadingFault, setIsLoadingFault] = useState(true);
  const fetchFaults = async () => {
    try {
      axios("http://localhost:3003/faults")
        .then((res) => setFaults(res.data))
        .catch((e) => console.log(e))
        .finally(() => setIsLoadingFault(false));
    } catch (error) {
      console.error('Fault verilerini alma hatası: ', error);
    }
  };
  useEffect(() => {
    fetchFaults();
  }, []);

  const faultContextValue = {
    faults,
    fetchFaults,
    isLoadingFault,
  };

  return (
    <FaultContext.Provider value={faultContextValue}>
      {children}
    </FaultContext.Provider>
  );
}