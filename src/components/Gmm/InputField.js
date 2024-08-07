import React from 'react';
function InputField({ name, placeholder, value, onChange, onBlur, error, className, touched, type }) {
  return (
    <div>
      <input
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && touched && <div className="error"><span className="error-icon"></span>{error}</div>}
    </div>
  );
}
export { InputField }; 