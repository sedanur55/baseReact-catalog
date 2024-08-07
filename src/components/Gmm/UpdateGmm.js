import React from 'react'
import 'react-dual-listbox/lib/react-dual-listbox.css';
import 'react-dual-listbox/src/less/react-dual-listbox.less';
import 'react-dual-listbox/src/scss/react-dual-listbox.scss';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Link, useNavigate } from 'react-router-dom';
import { useCatalog } from '../../contexts/CatalogContext';
import { useGmm } from '../../contexts/GmmContext';
import { useLocation } from '../../contexts/LocationContext';
import { showAlert } from '../Notification';
import Catalog from '../Catalog';

import DualListBox from 'react-dual-listbox';
function UpdateGmm() {
  const { catalogs, fetchCatalogs, isLoading } = useCatalog();
  const { gmms, fetchGmms, isLoadingGmm } = useGmm();
  const { locations, fetchLocations, isLoadingLocation, } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCatalog, setSelectedCatalog] = useState();
  const selectedGmm = gmms.find((gmm) => gmm.id === parseInt(id));


  useEffect(() => {
    if (selectedGmm) {
      setSelectedLocations(locations.map((location) => ({
        value: location.id,
        label: location.name
      })).filter(option => selectedGmm.location_ids.includes(option.value)) || []);
      setSelectedCatalog(selectedGmm.catalog_id || []);

    }
  }, [selectedGmm]);
  const selectedCatalogOption = catalogs.find((catalog) => catalog.id === selectedCatalog );

  const optionsLocation = locations.map((location) => ({
    value: location.id,
    label: location.name
  }));

  const optionsCatalog = catalogs.map((catalog) => ( {
    value: catalog.id,
    label: catalog.name,
  }));
  const handleCatalogChange = (event) => {
    setSelectedCatalog(parseInt(event.value));
  };
 
  const handleClick = async () => {
    selectedGmm.catalog_id = selectedCatalog;
    selectedGmm.location_ids = selectedLocations.map(item => item.value);
    try {
      // API endpoint URL'sini tanımlandı
      const endpointUrl = 'http://localhost:3003/gmms';
      // Verileri POST isteği ile gönderin
      const response = await fetch(`http://localhost:3003/gmms/${id}`, {
        method: 'PUT', // veya 'POST' veya 'PATCH', sunucunuzun API'sine bağlı olarak
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedGmm),
      });

      if (response.ok) {
        const updatedListResponse = await fetch(endpointUrl);
        if (updatedListResponse.ok) {
          const updatedList = await updatedListResponse.json();
          // updatedList, güncel verileri içerir
          fetchGmms(updatedList);
        }

        showAlert('success', 'Başarılı', 'Veriler başarıyla güncellendi.');
        return navigate("/gmm");
      } else {
        showAlert('error', 'Hatalı', 'Veriler güncellenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Veri gönderimi sırasında bir hata oluştu: ', error);
    }
  };
  // const initialSelectedLocations = optionsLocation.filter(option => selectedLocations.includes(option.value));
console.log('se',optionsLocation.filter(option => selectedLocations.includes(option.value)));
console.log('loc',selectedLocations);
 
  if (isLoading || isLoadingLocation || isLoadingGmm) {
    return
  }
  return (

      <div style={{'display':'block'}}>
        <h3 style={{ 'textShadow': '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{selectedGmm.name}</h3>
        <div className='selectContainer' style={{'width':'600px'}}>
          <div>
          <h4 > Choose Catalog</h4>
          {isLoading && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
          <Select
        className="basic-single"
        classNamePrefix="select"
        isDisabled={false}
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        name="color"
        options={optionsCatalog}
        onChange={handleCatalogChange}
        value={selectedCatalogOption ? { value: selectedCatalogOption.id, label: selectedCatalogOption.name } : null}

      />
          
          </div>
        </div>
        <div className='multiSelectBox'>
          <h4>Choose Location</h4>
          {selectedGmm && (
            <div>
              {isLoadingLocation && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
              <div className="scroll-container">
                <DualListBox
                  options={optionsLocation}
                  selected={selectedLocations}
                  onChange={(value) => setSelectedLocations(value)}
                  canFilter
                  simpleValue={false}
                  moveSelected={false}
                  preserveSelectOrder
                  className="custom-dual-listbox"
                />
               
              </div>
            </div>
          )}
        </div>
      <button onClick={handleClick} >Submit</button>
    </div>
  )
}

export default UpdateGmm;
