import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
// Catalog verilerini saklamak için bir bağlam oluşturuldu
const CatalogContext = createContext();

export function useCatalog() {
  return useContext(CatalogContext);
}
export function CatalogProvider({ children }) {
  const [catalogs, setCatalogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Katalog verilerini başka bir yerden alarak catalogs durumunu güncelleyen bir fonksiyon ekleyin
  const fetchCatalogs = async () => {
    try {
      // Verileri almak için axios veya fetch gibi bir kütüphane kullanabilirsiniz
      axios("http://localhost:3003/catalogs")
        .then((res) => setCatalogs(res.data))
        .catch((e) => console.log(e))
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.error('Katalog verilerini alma hatası: ', error);
    }
  };
  useEffect(() => {
    fetchCatalogs();
  }, []);

  // Katalog bağlamını değerlerle doldurun
  const catalogContextValue = {
    catalogs,
    fetchCatalogs,
    isLoading,
  };

  return (
    <CatalogContext.Provider value={catalogContextValue}>
      {children}
    </CatalogContext.Provider>
  );
}