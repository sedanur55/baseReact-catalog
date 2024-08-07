import React from 'react'
import { useState } from 'react'
import '../style.css';
import { Link } from 'react-router-dom';
import { useGmm } from '../../contexts/GmmContext';
function List() {
  const { gmms, fetchGmms, isLoading } = useGmm();
  const [filterText, setFilterText] = useState('');
  const filtered = gmms.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filterText.toLocaleLowerCase())
    )
  })
  return (
    <div >
      <input className="filter" placeholder='filter gmm' value={filterText} onChange={(e) => setFilterText(e.target.value)}></input>
      {isLoading && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
      <div className="scroll-container">
        <ul className='list'>
        {
            filtered.map((gmm, i) => (<li key={i}>
              <Link to={`/gmm/${gmm.id}`} className="custom-link">
                <span style={{'float':'left'}}>{gmm.name}</span><span style={{'float':'right'}} >{gmm.id}</span>
              </Link>
            </li>))
          }
        </ul></div>
      <p style={{ color: 'gray' }}> Total gmm ({filtered.length})</p>
    </div>
  )
}

export default List;
