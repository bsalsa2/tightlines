import React from 'react';
import './Form.css';
import Button from './Button';

const Form = ({ title, onSubmit, children, submitText = 'Submit', isLoading = false }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      {title && <h2 className="form-title">{title}</h2>}
      <div className="form-fields">{children}</div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : submitText}
      </Button>
    </form>
  );
};

const FormField = ({ label, type = 'text', placeholder, value, onChange, error, required = false }) => {
  return (
    <div className="form-field">
      {label && (
        <label>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={error ? 'input-error' : ''}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export { Form, FormField };
