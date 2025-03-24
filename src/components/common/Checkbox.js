import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Checkbox = forwardRef(({
  id,
  name,
  checked,
  onChange,
  label,
  value,
  helperText,
  error,
  className = '',
  disabled = false,
  required = false,
  ...props
}, ref) => {
  // Generate a random ID if one is not provided
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={`form-group ${className}`}>
      <label className="checkbox">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          name={name || checkboxId}
          checked={checked}
          onChange={onChange}
          value={value}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined
          }
          {...props}
        />
        <span className="checkmark"></span>
        <span className="ml-2">{label}</span>
        {required && <span className="text-error ml-1">*</span>}
      </label>
      
      {/* Helper Text */}
      {helperText && !error && (
        <span id={`${checkboxId}-helper`} className="helper-text ml-8">
          {helperText}
        </span>
      )}
      
      {/* Error Message */}
      {error && (
        <span id={`${checkboxId}-error`} className="error-text ml-8" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  helperText: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool
};

export default Checkbox;
