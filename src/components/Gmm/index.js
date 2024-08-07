import React from 'react'
import '../style.css';
import Form from './Form';
import List from './List';

function Gmm() {
  return (
    <div>
      <div id="list_container" className=''>
        <Form />
      </div>
      <div className='containerbody' >
        <List />
      </div>
    </div>
  );
}
export default Gmm;
