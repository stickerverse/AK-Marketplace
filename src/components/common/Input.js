import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(({
  type = 'text',
  id,
  name,
  value,
  onChange,
  label,
  placeholder,
  helperText,
  error,
  className = '',
  variant = 'default',
  disabled = false,
  required = false,
  ...props
}, ref) => {
  // Generate a random ID if one is not provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  // Determine input class based on variant and error state
  const getInputClass = () => {
    let baseClass = 'form-control';
    
    // Add variant class
    if (variant === 'glass') {
      baseClass += ' form-control-glass';
    }
    
    // Add error class
    if (error) {
      baseClass += ' error';
    }
    
    // Add any additional custom classes
    if (className) {
      baseClass += ` ${className}`;
    }
    
    return baseClass;
  };

  return (
    <div className="form-group">
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={required ? 'required' : ''}>
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      {/* Input */}
      <input
        ref={ref}
        type={type}
        id={inputId}
        name={name || inputId}
        value={value}
        onChange={onChange}
        className={getInputClass()}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      
      {/* Helper Text */}
      {helperText && !error && (
        <span id={`${inputId}-helper`} className="helper-text">
          {helperText}
        </span>
      )}
      
      {/* Error Message */}
      {error && (
        <span id={`${inputId}-error`} className="error-text" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'number',
    'tel',
    'url',
    'search',
    'date',
    'time',
    'datetime-local',
    'month',
    'week',
    'color'
  ]),
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'glass']),
  disabled: PropTypes.bool,
  required: PropTypes.bool
};

export default Input;
