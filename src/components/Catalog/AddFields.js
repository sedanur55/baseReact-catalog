import React from 'react'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Link, useNavigate } from 'react-router-dom';
import { useCatalog } from '../../contexts/CatalogContext';
import { useArea } from '../../contexts/AreaContext';
import { useFault } from '../../contexts/FaultContext';
import { showAlert } from '../Notification';
function AddFields() {
  const { catalogs, fetchCatalogs, isLoading } = useCatalog();
  const { areas, fetchAreas, isLoadingArea } = useArea();
  const { faults, fetchFaults, isLoadingFault } = useFault();
  const [filterTextArea, setFilterTextArea] = useState('');
  const [filterTextFault, setFilterTextFault] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedFaults, setSelectedFaults] = useState([]);
  const selectedCatalog = catalogs.find((catalog) => catalog.id === parseInt(id));
  useEffect(() => {
    if (selectedCatalog) {
      setSelectedAreas(selectedCatalog.area_ids || []);
      setSelectedFaults(selectedCatalog.fault_ids || []);
    }
  }, [selectedCatalog]);
  const filteredArea = areas.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filterTextArea.toLocaleLowerCase())
    )
  })
  const filteredFault = faults.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filterTextFault.toLocaleLowerCase())
    )
  })

  const handleAreaChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedAreas([...selectedAreas, parseInt(value)]);
    } else {
      setSelectedAreas(selectedAreas.filter((area) => area !== parseInt(value)));
    }
  };

  const handleFaultChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedFaults([...selectedFaults, parseInt(value)]);
    } else {
      setSelectedFaults(selectedFaults.filter((fault) => fault !== parseInt(value)));
    }
  };
  const handleClick = async () => {
    selectedCatalog.area_ids = selectedAreas;
    selectedCatalog.fault_ids = selectedFaults;
    try {
      // API endpoint URL'sini tanımlandı
      const endpointUrl = 'http://localhost:3003/catalogs';
      // Verileri POST isteği ile gönderin
      const response = await fetch(`http://localhost:3003/catalogs/${id}`, {
        method: 'PUT', // veya 'POST' veya 'PATCH', sunucunuzun API'sine bağlı olarak
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedCatalog),
      });

      if (response.ok) {
        const updatedListResponse = await fetch(endpointUrl);
        if (updatedListResponse.ok) {
          const updatedList = await updatedListResponse.json();
          // updatedList, güncel verileri içerir
          fetchCatalogs(updatedList);
        }

        showAlert('success', 'Başarılı', 'Veriler başarıyla güncellendi.');
        return navigate("/");
      } else {
        showAlert('error', 'Hatalı', 'Veriler güncellenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Veri gönderimi sırasında bir hata oluştu: ', error);
    }
  };
  if (isLoading || isLoadingArea || isLoadingFault) {
    return
  }
  return (

    <div id='postContainer'>
      <div >
        <h3 style={{ 'textShadow': '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{selectedCatalog.name}</h3>
        <div className='multiSelectTable'>
          <h4>Areas</h4>
          {selectedCatalog && (
            <div>
              <input className="filter" placeholder='filter area' value={filterTextArea} onChange={(e) => setFilterTextArea(e.target.value)}></input>
              {isLoadingArea && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
              <div className="scroll-container">
                <ul className='list'>
                  {
                    filteredArea.map((area, i) => (<li key={i}>

                      <label key={i} className="custom-checkbox-label">
                        <input className='multiCheckbox'
                          type="checkbox"
                          value={area.id}
                          checked={selectedAreas.includes(parseInt(area.id))}
                          onChange={handleAreaChange}
                        /><span className="checkbox-icon"></span>
                        {area.name}</label>


                    </li>))
                  }
                </ul></div>
              <p style={{ color: 'gray' }}> Total area ({filteredArea.length})</p>
            </div>
          )}
          <div >
          </div>
        </div>
        <div className='multiSelectTable'>
          <h4>Faults</h4>
          {selectedCatalog && (
            <div>
              <input className="filter" placeholder='filter fault' value={filterTextFault} onChange={(e) => setFilterTextFault(e.target.value)}></input>
              {isLoadingFault && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
              <div className="scroll-container">
                <ul className='list'>
                  {
                    filteredFault.map((fault, i) => (<li key={i}>
                      <label key={i} className="custom-checkbox-label">
                        <input className='multiCheckbox'
                          type="checkbox"
                          value={fault.id}
                          checked={selectedFaults.includes(parseInt(fault.id))}
                          onChange={handleFaultChange}
                        />
                        <span className="checkbox-icon"></span>
                        {fault.name}
                      </label>

                    </li>))
                  }
                </ul></div>
              <p style={{ color: 'gray' }}> Total fault ({filteredFault.length})</p>
            </div>
          )}
        </div>
      </div>
      <button onClick={handleClick} >Submit</button>
    </div>
  )
}

export default AddFields
