import React from 'react'
import { useState } from 'react'
import '../style.css';
import { Link } from 'react-router-dom';
import { useCatalog } from '../../contexts/CatalogContext';
function List() {
  const { catalogs, fetchCatalogs, isLoading } = useCatalog();
  const [filterText, setFilterText] = useState('');
  const filtered = catalogs.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filterText.toLocaleLowerCase())
    )
  })
  return (
    <div >
      <input className="filter" placeholder='filter catalog' value={filterText} onChange={(e) => setFilterText(e.target.value)}></input>
      {isLoading && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
      <div className="scroll-container">
        <ul className='list'>
        {
            filtered.map((catalog, i) => (<li key={i}>
              <Link to={`/catalog/${catalog.id}`} className="custom-link">
                <span style={{'float':'left'}}>{catalog.name}</span><span style={{'float':'right'}} >{catalog.number}</span>
              </Link>
            </li>))
          }
        </ul></div>
      <p style={{ color: 'gray' }}> Total catalog ({filtered.length})</p>
    </div>
  )
}

export default List;
