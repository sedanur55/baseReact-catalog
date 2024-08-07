import React from 'react'
import { useFormik } from 'formik';
import {validationsCatalog,validationsGmm} from '../validations';
import '../style.css';
import { showAlert } from '../Notification';
import { useCatalog } from '../../contexts/CatalogContext';
import {InputField} from './InputField';

function Form() {
  const { catalogs, fetchCatalogs } = useCatalog();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      name: '',
      number: '',
      area_ids: [],
      fault_ids: [],
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        // API endpoint URL'sini tanımlandı
        const endpointUrl = 'http://localhost:3003/catalogs';
        // Verileri POST isteği ile gönderin
        const response = await fetch(endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const updatedListResponse = await fetch(endpointUrl);
          if (updatedListResponse.ok) {
            const updatedList = await updatedListResponse.json();
            // updatedList, güncel verileri içerir
            fetchCatalogs(updatedList);
          }
          resetForm();
          showAlert('success', 'Başarılı', 'Form başarıyla gönderildi.');
        } else {
          showAlert('error', 'Hatalı', 'Form gönderilemedi.');
        }
      } catch (error) {
        console.error('Veri gönderimi sırasında bir hata oluştu: ', error);
      }
    },
    validationSchema: validationsCatalog,
  });
  return (
    <div className=''>
      <h5 >Create Catalog</h5>
      <form onSubmit={handleSubmit}>
        <div>
        <InputField
        className="filter"
        type="text"
        name="name"
        placeholder="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
      />
        </div>
        <div>
        <InputField
        className="filter"
        type="number"
        name="number"
        placeholder="number"
        value={values.number}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.number}
        touched={touched.number}
      />
        </div>
        <div>
          <button type="submit" >Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Form;